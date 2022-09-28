import 'reflect-metadata';
import { Container } from 'inversify';
import { RESTAppComponent } from './types/component.types.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import { ConfigInterface } from './common/config/config.interface.js';
import { MongoDBInterface } from './common/database-client/mongo-db.interface.js';
import { LoggerService } from './common/logger/logger.service.js';
import { ConfigService } from './common/config/config.service.js';
import MongoDBService from './common/database-client/mongo-db.service.js';
import RESTApplication from './app/rest-application.js';

const RESTAppContainer = new Container;
RESTAppContainer.bind<RESTApplication>(RESTAppComponent.Application).to(RESTApplication);
RESTAppContainer.bind<LoggerInterface>(RESTAppComponent.LoggerInterface).to(LoggerService);
RESTAppContainer.bind<ConfigInterface>(RESTAppComponent.ConfigInterface).to(ConfigService);
RESTAppContainer.bind<MongoDBInterface>(RESTAppComponent.DatabaseInterface).to(MongoDBService);

const RESTApp = RESTAppContainer.get<RESTApplication>(RESTAppComponent.Application);

await RESTApp.init();
