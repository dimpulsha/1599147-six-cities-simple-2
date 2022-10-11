import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
// import { fillDTO } from '../../utils/common-utils.js';
// import CommentsDBService from './comments-service.js';

@injectable()
export default class CommentsController extends Controller {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) readonly logger: LoggerInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.getByOfferId});
  }

  public create(_req: Request, _res: Response): void {
    const createResponse = ' comments.create Response';
    this.logger.info('call comments.create method');
    this.send(_res, StatusCodes.OK, createResponse);
  }

  public getByOfferId(_req: Request, _res: Response): void {
    const createResponse = ' comments.getByOfferId Response';
    this.logger.info('call comments.getByOfferId method');
    this.send(_res, StatusCodes.OK, createResponse);
  }

}
