import {Request, Response} from 'express';
import { inject, injectable } from 'inversify';
// import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import HttpError from '../../common/errors/http.errors.js';
// import { RequestQuery } from '../../types/request-query.type.js';
import { CommentsDBServiceInterface } from './comments-service.interface.js';
import { OfferDBServiceInterface } from '../offer/offer-service.interface.js';
import { fillDTO } from '../../utils/common-utils.js';
import CommentsResponse from './response/comments.response.js';
import CreateCommentsDTO from './dto/create-comments.dto.js';

// type ParamsGetOffer = {
//    offerId: string;
// }

@injectable()
export default class CommentsController extends Controller {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsDBServiceInterface) readonly commentsService: CommentsDBServiceInterface,
    @inject(RESTAppComponent.OfferDBServiceInterface) readonly offerService: OfferDBServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    // this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getList });
  }

  public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentsDTO>, res: Response): Promise<void> {
    if (!this.offerService.checkOffer(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer ${body.offerId} not found`,
        'CommentsController',
      );
    }
    // todo нет проверки на пользователя
    const commentResult = await this.commentsService.create(body);
    await this.offerService.commentInfoUpdate(body.offerId);
    this.ok(res, fillDTO(CommentsResponse, commentResult));
  }

  // public async getList({ params, query }: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, Record<string, unknown>, RequestQuery>, res: Response): Promise<void> {
  //   const { offerId } = params;
  //   const commentLimit = Number(query.limit);
  //   const result = await this.commentsService.getByOfferId(offerId, commentLimit);
  //   if (!result) {
  //     throw new HttpError(
  //       StatusCodes.NOT_FOUND,
  //       `Offer ${offerId} not found`,
  //       'CommentsController',
  //     );
  //   }
  //   this.logger.debug(JSON.stringify(result));
  //   this.ok(res, fillDTO(CommentsResponse, result));
  // }
}
