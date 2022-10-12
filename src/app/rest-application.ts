import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import express, {Express} from 'express';
import { RESTAppComponent } from '../types/component.types.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { MongoDBInterface } from '../common/database-client/mongo-db.interface.js';
import { getMongoURI } from '../common/database-client/db-uri.js';
// import OfferDBService from '../modules/offer/offer-service.js';
// import CommentsDBService from '../modules/comments/comments-service.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';

@injectable()
export default class RESTApplication {
  private expressInstance: Express;

  constructor (
    @inject(RESTAppComponent.LoggerInterface) private logger: LoggerInterface,
    @inject(RESTAppComponent.ConfigInterface) private configItem: ConfigInterface,
    @inject(RESTAppComponent.DatabaseInterface) private database: MongoDBInterface,
    // @inject(RESTAppComponent.OfferDBServiceInterface) private offer: OfferDBService,
    // @inject(RESTAppComponent.CommentsDBServiceInterface) private comments: CommentsDBService,
    @inject(RESTAppComponent.OfferController) private offerController: ControllerInterface,
    @inject(RESTAppComponent.UserController) private userController: ControllerInterface,
    @inject(RESTAppComponent.CommentsController) private commentsController: ControllerInterface,
    @inject(RESTAppComponent.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,

  ) {
    this.expressInstance = express();
  }

  public initRoutes() {
    this.expressInstance.use('/offer', this.offerController.router);
    this.expressInstance.use('/user', this.userController.router);
    this.expressInstance.use('/comments', this.commentsController.router);
  }

  public initMiddleware() {
    this.expressInstance.use(express.json());
  }

  public initExceptionFilters() {
    this.expressInstance.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

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

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressInstance.listen(this.configItem.getItem('PORT'));
    this.logger.info(`Server started on http://localhost:${this.configItem.getItem('PORT')}`);
  }

}
