import {Request, Response} from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferDBServiceInterface } from './offer-service.interface.js';
import { CommentsDBServiceInterface } from '../comments/comments-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import OfferListResponse from './response/offer-list.response.js';
import { fillDTO } from '../../utils/common-utils.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import UpdateOfferDTO from './dto/update-offer.dto.js';
import OfferItemResponse from './response/offer.response.js';
import { RequestQuery } from '../../types/request-query.type.js';
import CommentsResponse from '../comments/response/comments.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-object-id.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exist.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateOwnerMiddleware } from '../../common/middlewares/validate-owner.middleware.js';

type ParamsGetOffer = {
   offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(RESTAppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(RESTAppComponent.ConfigInterface) readonly configService: ConfigInterface,
    @inject(RESTAppComponent.CommentsDBServiceInterface) readonly commentsService: CommentsDBServiceInterface,
    @inject(RESTAppComponent.OfferDBServiceInterface) private readonly offerService: OfferDBServiceInterface
  ) {

    super(logger, configService);

    this.logger.info('Register routes for OfferController???');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/', method: HttpMethod.Post, handler: this.create,
      middlewares:
        [new PrivateRouteMiddleware,
          new ValidateDtoMiddleware(CreateOfferDTO)]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Get, handler: this.getItem,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Patch, handler: this.update,
      middlewares:
        [new PrivateRouteMiddleware,
          new ValidateDtoMiddleware(UpdateOfferDTO),
          new ValidateObjectIdMiddleware('offerId'),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
          new ValidateOwnerMiddleware(this.offerService, 'Offer'),
        ]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteItem,
      middlewares: [new PrivateRouteMiddleware,
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateOwnerMiddleware(this.offerService, 'Offer')]
    });
    this.addRoute({
      path: '/comments/:offerId', method: HttpMethod.Get, handler: this.getCommentsList,
      middlewares:
        [new ValidateObjectIdMiddleware('offerId'),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async index({ query }: Request<Record<string, unknown>, Record<string, unknown>,  RequestQuery>, res: Response): Promise<void> {
    this.logger.info(`Client request ${query.limit} records from offer`);
    const offer = await this.offerService.getList(Number(query.limit));
    const offerResponse = fillDTO(OfferListResponse, offer);
    this.ok(res, offerResponse);
  }

  public async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>, res: Response): Promise<void>  {
    const { body, user } = req;
    const result = await this.offerService.create({ ...body, ownerId: user.id });
    const offer = await this.offerService.getById(result.id);
    this.created(res, fillDTO(OfferItemResponse, offer));
  }

  public async getItem({ params }: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.getById(offerId);
    this.ok(res, fillDTO(OfferItemResponse, result));
  }

  public async update({ body, params }: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDTO>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.updateById(offerId, body);
    const offerResult = await this.offerService.getById(result?.id);
    this.ok(res, fillDTO(OfferItemResponse, offerResult));
  }

  public async deleteItem({ params }: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.deleteById(offerId);
    this.noContent(res, result);
  }

  public async getCommentsList({ params, query }: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, Record<string, unknown>, RequestQuery>, res: Response): Promise<void> {
    const { offerId } = params;
    const commentLimit = Number(query.limit);
    const result = await this.commentsService.getByOfferId(offerId, commentLimit);
    this.logger.debug(JSON.stringify(result));
    this.ok(res, fillDTO(CommentsResponse, result));
  }
}
