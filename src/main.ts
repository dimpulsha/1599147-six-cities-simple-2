import 'reflect-metadata';
import {types} from '@typegoose/typegoose';
import { Container } from 'inversify';
import { RESTAppComponent } from './types/component.types.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import { ConfigInterface } from './common/config/config.interface.js';
import { MongoDBInterface } from './common/database-client/mongo-db.interface.js';
import { UserDBServiceInterface } from './modules/user/user-service.interface.js';
import { FeatureDBServiceInterface } from './modules/features/feature-service.interface.js';
import { OfferDBServiceInterface } from './modules/offer/offer-service.interface.js';
import { CommentsDBServiceInterface } from './modules/comments/comments-service.interface.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { FeatureEntity, FeatureModel } from './modules/features/feature.entity.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import { CommentsEntity, CommentsModel } from './modules/comments/comments.entity.js';
import { LoggerService } from './common/logger/logger.service.js';
import { ConfigService } from './common/config/config.service.js';
import MongoDBService from './common/database-client/mongo-db.service.js';
import UserDBService from './modules/user/user-service.js';
import FeatureDBService from './modules/features/feature-service.js';
import OfferDBService from './modules/offer/offer-service.js';
import CommentsDBService from './modules/comments/comments-service.js';
import RESTApplication from './app/rest-application.js';
import { ControllerInterface } from './common/controller/controller.interface.js';
import OfferController from './modules/offer/offer.controller.js';
import UserController from './modules/user/user.controller.js';
import CommentsController from './modules/comments/comments.controller.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import { ExceptionFilterInterface } from './common/errors/exception-filter.interface.js';


const RESTAppContainer = new Container;
RESTAppContainer.bind<RESTApplication>(RESTAppComponent.Application).to(RESTApplication).inSingletonScope();
RESTAppContainer.bind<LoggerInterface>(RESTAppComponent.LoggerInterface).to(LoggerService).inSingletonScope();
RESTAppContainer.bind<ConfigInterface>(RESTAppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
RESTAppContainer.bind<MongoDBInterface>(RESTAppComponent.DatabaseInterface).to(MongoDBService).inSingletonScope();
RESTAppContainer.bind<UserDBServiceInterface>(RESTAppComponent.UserDBServiceInterface).to(UserDBService);
RESTAppContainer.bind<types.ModelType<UserEntity>>(RESTAppComponent.UserModel).toConstantValue(UserModel);
RESTAppContainer.bind<FeatureDBServiceInterface>(RESTAppComponent.FeatureDBServiceInterface).to(FeatureDBService);
RESTAppContainer.bind<types.ModelType<FeatureEntity>>(RESTAppComponent.FeatureModel).toConstantValue(FeatureModel);
RESTAppContainer.bind<OfferDBServiceInterface>(RESTAppComponent.OfferDBServiceInterface).to(OfferDBService);
RESTAppContainer.bind<types.ModelType<OfferEntity>>(RESTAppComponent.OfferModel).toConstantValue(OfferModel);
RESTAppContainer.bind<CommentsDBServiceInterface>(RESTAppComponent.CommentsDBServiceInterface).to(CommentsDBService);
RESTAppContainer.bind<types.ModelType<CommentsEntity>>(RESTAppComponent.CommentsModel).toConstantValue(CommentsModel);
RESTAppContainer.bind<ControllerInterface>(RESTAppComponent.OfferController).to(OfferController).inSingletonScope();
RESTAppContainer.bind<ControllerInterface>(RESTAppComponent.UserController).to(UserController).inSingletonScope();
RESTAppContainer.bind<ControllerInterface>(RESTAppComponent.CommentsController).to(CommentsController).inSingletonScope();
RESTAppContainer.bind<ExceptionFilterInterface>(RESTAppComponent.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();


const RESTApp = RESTAppContainer.get<RESTApplication>(RESTAppComponent.Application);

await RESTApp.init();
