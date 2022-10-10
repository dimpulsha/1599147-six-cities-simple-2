import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferDBServiceInterface } from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';

 @injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(RESTAppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(RESTAppComponent.OfferDBServiceInterface) private readonly offerService: OfferDBServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.getList();
    this.send(res, StatusCodes.OK, offer);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
