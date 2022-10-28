import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { TSVFileReader } from '../common/file-reader/tsv-file-reader.js';
import { createOffer } from '../utils/createOffer.js';
import { getErrorMessage } from '../utils/common-utils.js';
import { ConsoleLoggerService } from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { MongoDBInterface } from '../common/database-client/mongo-db.interface.js';
import MongoDBService from '../common/database-client/mongo-db.service.js';
import { getMongoURI } from '../common/database-client/db-uri.js';
import { UserDBServiceInterface } from '../modules/user/user-service.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import UserDBService from '../modules/user/user-service.js';
import { FeatureDBServiceInterface } from '../modules/features/feature-service.interface.js';
import { FeatureModel } from '../modules/features/feature.entity.js';
import FeatureDBService from '../modules/features/feature-service.js';
import { OfferDBServiceInterface } from '../modules/offer/offer-service.interface.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import OfferDBService from '../modules/offer/offer-service.js';
import { CitiesDBServiceInterface } from '../modules/cities/cities-service.interface.js';
import { CityModel } from '../modules/cities/cities.entity.js';
import CitiesDBService from '../modules/cities/cities.service.js';
import { CommentsDBServiceInterface } from '../modules/comments/comments-service.interface.js';
import { CommentsModel } from '../modules/comments/comments.entity.js';
import CommentsDBService from '../modules/comments/comments-service.js';

import { Offer } from '../types/offer.type.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface{
  public readonly name = '--import';

  private userService!: UserDBServiceInterface;
  private featureService!: FeatureDBServiceInterface;
  private offerService!: OfferDBServiceInterface;
  private databaseService!: MongoDBInterface;
  private cityService!: CitiesDBServiceInterface;
  private commentsService!: CommentsDBServiceInterface;
  private logger!: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.featureService = new FeatureDBService(FeatureModel, this.logger,);
    this.userService = new UserDBService(this.logger, UserModel);
    this.cityService = new CitiesDBService(this.logger, CityModel);
    this.commentsService = new CommentsDBService(this.logger, CommentsModel);
    this.offerService = new OfferDBService(OfferModel, this.logger, this.commentsService ,this.cityService, this.featureService);
    this.databaseService = new MongoDBService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const features = [];
    const user = await this.userService.findOrCreate({
      ...offer.owner,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    const city = await this.cityService.findOrCreate({ ...offer.city});

    for (const { name } of offer.features) {
      if (name) {
        const existFeature = await this.featureService.findOrCreate(name, { name });
        features.push(existFeature.name);
      }
    }

    await this.offerService.create({
      ...offer,
      features,
      ownerId: user.id,
      cityId: city.name,
    });
  }

  private async onLine(rowOffer: string, resolve: () => void) {
    const offer = createOffer(rowOffer);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(chalk.green(`${count} rows imported.`));
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbName: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbName);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const importReader = new TSVFileReader(filename.trim());
    importReader.on('line', this.onLine);
    importReader.on('end', this.onComplete);

    try {
      await importReader.read();
    } catch(err) {
      console.log(chalk.hex('#FFA500')(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }

}
