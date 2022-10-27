import {Request, Response} from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CommentsDBServiceInterface } from './comments-service.interface.js';
import { OfferDBServiceInterface } from '../offer/offer-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { fillDTO } from '../../utils/common-utils.js';
import CommentsResponse from './response/comments.response.js';
import CreateCommentsDTO from './dto/create-comments.dto.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exist.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-object-id.middleware.js';

type ParamsGetOffer = {
   offerId: string;
}

@injectable()
export default class CommentsController extends Controller {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) readonly logger: LoggerInterface,
    @inject(RESTAppComponent.ConfigInterface) readonly configService: ConfigInterface,
    @inject(RESTAppComponent.CommentsDBServiceInterface) readonly commentsService: CommentsDBServiceInterface,
    @inject(RESTAppComponent.OfferDBServiceInterface) readonly offerService: OfferDBServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register routes for Commentsontroller…');
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Post, handler: this.create,
      middlewares: [new PrivateRouteMiddleware, new ValidateDtoMiddleware(CreateCommentsDTO), new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async create(req: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, CreateCommentsDTO>, res: Response): Promise<void> {
    const { body, params } = req;
    const { offerId } = params;
    this.logger.debug(JSON.stringify(body));
    const commentResult = await this.commentsService.create({ ...body, ownerId: req.user.id, offerId: offerId });
    await this.offerService.commentInfoUpdate(offerId);
    this.logger.debug(JSON.stringify(commentResult));
    this.ok(res, fillDTO(CommentsResponse, commentResult));
  }
}
