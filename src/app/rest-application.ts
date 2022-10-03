import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { RESTAppComponent } from '../types/component.types.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { MongoDBInterface } from '../common/database-client/mongo-db.interface.js';
import { getMongoURI } from '../common/database-client/db-uri.js';

@injectable()
export default class RESTApplication {

  constructor (
    @inject(RESTAppComponent.LoggerInterface) private logger: LoggerInterface,
    @inject(RESTAppComponent.ConfigInterface) private configItem: ConfigInterface,
    @inject(RESTAppComponent.DatabaseInterface) private database: MongoDBInterface,
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


  }

}
