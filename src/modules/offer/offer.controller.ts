import {Request, Response} from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferDBServiceInterface } from './offer-service.interface.js';
import OfferListResponse from './response/offer-list.response.js';
import { fillDTO } from '../../utils/common-utils.js';
import HttpError from '../../common/errors/http.errors.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import OfferItemResponse from './response/offer.response.js';

type ParamsGetOffer = {
   offerId: string;
 }

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
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.getItem});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteItem});
  }

  // todo - limit добавить
  public async index(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.getList();
    const offerResponse = fillDTO(OfferListResponse, offer);
    this.ok(res, offerResponse);
  }

  public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>, res: Response): Promise<void>  {
    this.logger.debug(JSON.stringify(body));
    const result = await this.offerService.create(body);
    const offer = await this.offerService.getById(result.id);
    this.ok(res, fillDTO(OfferItemResponse, offer));
  }

  public async getItem({ params }: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.getById(offerId);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer ${offerId} not found`,
        'OfferController',
      );
    }
    this.ok(res, fillDTO(OfferItemResponse, result));
  }

  public async update({ body, params }: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.updateById(offerId, body);
    // todo - проверка пользователя
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer ${offerId} not found`,
        'OfferController',
      );
    }
    const offer = await this.offerService.getById(result.id);
    this.ok(res, fillDTO(OfferItemResponse, offer));
  }

  public async deleteItem({ params }: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.deleteById(offerId);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer ${offerId} not found`,
        'OfferController',
      );
    }
    this.noContent(res, result);
  }
}
