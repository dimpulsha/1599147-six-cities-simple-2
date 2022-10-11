import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { RESTAppComponent } from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import CreateCommentDTO from './dto/create-comments.dto.js';
import { CommentsEntity } from './comments.entity.js';
import { CommentsDBServiceInterface } from './comments-service.interface.js';
import { OfferDBServiceInterface } from '../offer/offer-service.interface.js';

@injectable()
export default class CommentsDBService implements CommentsDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsModel) private readonly commentsModel: ModelType<CommentsEntity>,
    @inject(RESTAppComponent.OfferDBServiceInterface) private readonly offer: OfferDBServiceInterface
  ) { }

  public async create(commentsDTO: CreateCommentDTO): Promise<DocumentType<CommentsEntity>> {

    const createResult = await this.commentsModel.create(commentsDTO);
    this.logger.info(`Comments from user ${commentsDTO.ownerId}  to offer ${commentsDTO.offerId} created`);
    this.offer.commentInfoUpdate(commentsDTO.offerId);
    return createResult.populate('ownerId');
  }

  public async getByOfferId(offerId: string): Promise<DocumentType<CommentsEntity>[]> {
    const getByOfferResult = await this.commentsModel.find({ offerId }).populate('ownerId');
    this.logger.debug(`Present comments for offer ${offerId}`);
    return getByOfferResult;
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const deleteResult = await this.commentsModel.deleteMany({ offerId }).exec();
    this.logger.info(`Delete ${deleteResult.deletedCount} comments for offer ${offerId}`);
    return deleteResult.deletedCount;
  }

}

