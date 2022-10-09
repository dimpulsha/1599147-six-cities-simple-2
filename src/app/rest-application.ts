import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { RESTAppComponent } from '../types/component.types.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { MongoDBInterface } from '../common/database-client/mongo-db.interface.js';
import { getMongoURI } from '../common/database-client/db-uri.js';
import OfferDBService from '../modules/offer/offer-service.js';
import CommentsDBService from '../modules/comments/comments-service.js';

@injectable()
export default class RESTApplication {

  constructor (
    @inject(RESTAppComponent.LoggerInterface) private logger: LoggerInterface,
    @inject(RESTAppComponent.ConfigInterface) private configItem: ConfigInterface,
    @inject(RESTAppComponent.DatabaseInterface) private database: MongoDBInterface,
    @inject(RESTAppComponent.OfferDBServiceInterface) private offer: OfferDBService,
    @inject(RESTAppComponent.CommentsDBServiceInterface) private comments: CommentsDBService,

  ) { }

  public async init() {

    this.logger.info('RESTService init...');
    this.logger.info(String(this.configItem.getItem('PORT')));

    const databaseURI = getMongoURI(
      this.configItem.getItem('DATABASE_USER'),
      this.configItem.getItem('DATABASE_PWD'),
      this.configItem.getItem('DATABASE_URL'),
      this.configItem.getItem('DATABASE_PORT'),
      this.configItem.getItem('DATABASE_NAME')
    );
    this.logger.debug(String(databaseURI));

    this.database.connect(databaseURI);

    const qfferById = await this.offer.getById('633dd658acd5f7a16b463d6d');
    // const qfferById = await this.offer.getList();
    console.log(qfferById);

    const result = await this.comments.calcRating('633dd658acd5f7a16b463d6d');
    console.log(result);
  }

}
