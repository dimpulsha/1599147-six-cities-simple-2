import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../common/errors/http.errors.js';

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
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public getByOfferId(_req: Request, _res: Response): void {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

}
