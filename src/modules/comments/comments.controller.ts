import {Request, Response} from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import HttpError from '../../common/errors/http.errors.js';
import { CommentsDBServiceInterface } from './comments-service.interface.js';
import { OfferDBServiceInterface } from '../offer/offer-service.interface.js';
import { fillDTO } from '../../utils/common-utils.js';
import CommentsResponse from './response/comments.response.js';
import CreateCommentsDTO from './dto/create-comments.dto.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';

@injectable()
export default class CommentsController extends Controller {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsDBServiceInterface) readonly commentsService: CommentsDBServiceInterface,
    @inject(RESTAppComponent.OfferDBServiceInterface) readonly offerService: OfferDBServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateCommentsDTO)]});
  }

  public async create(req: Request<object, object, CreateCommentsDTO>, res: Response): Promise<void> {
    const {body} = req;
    if (!this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer ${body.offerId} not found`,
        'CommentsController',
      );
    }

    const commentResult = await this.commentsService.create({...body, ownerId: req.user.id});
    await this.offerService.commentInfoUpdate(body.offerId);
    this.ok(res, fillDTO(CommentsResponse, commentResult));
  }
}
