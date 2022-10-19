import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { RESTAppComponent } from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import CreateCommentDTO from './dto/create-comments.dto.js';
import { CommentsEntity } from './comments.entity.js';
import { CommentsDBServiceInterface } from './comments-service.interface.js';
import { DEFAULT_COMMENTS_COUNT } from '../../app.config.js';

@injectable()
export default class CommentsDBService implements CommentsDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsModel) private readonly commentsModel: ModelType<CommentsEntity>,
  ) { }

  public async create(commentsDTO: CreateCommentDTO): Promise<DocumentType<CommentsEntity>> {
    const createResult = await this.commentsModel.create(commentsDTO);
    this.logger.info(`Comments from user ${commentsDTO.ownerId}  to offer ${commentsDTO.offerId} created. text: ${commentsDTO.commentText}`);
    return createResult.populate('ownerId');
  }

  public async getByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentsEntity>[]> {
    let recordLimit = DEFAULT_COMMENTS_COUNT;
    if (count) {
      recordLimit = count;
    }
    const getByOfferResult = await this.commentsModel.find({ offerId }).limit(recordLimit).populate('ownerId');
    this.logger.debug(`Present comments for offer ${offerId}`);
    return getByOfferResult;
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const deleteResult = await this.commentsModel.deleteMany({ offerId }).exec();
    this.logger.info(`Delete ${deleteResult.deletedCount} comments for offer ${offerId}`);
    return deleteResult.deletedCount;
  }

}

