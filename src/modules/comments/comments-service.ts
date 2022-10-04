import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { RESTAppComponent } from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import CreateCommentDTO from './dto/create-comments.dto.js';
import { CommentsEntity } from './comments.entity.js';
import { CommentsDBServiceInterface } from './comments-service.interface.js';

@injectable()
export default class CommentsDBService implements CommentsDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsModel) private readonly CommentsModel: ModelType<CommentsEntity>
  ) { }

  public async create(commentsDTO: CreateCommentDTO): Promise<DocumentType<CommentsEntity>> {

    const createResult = await this.CommentsModel.create(commentsDTO);
    this.logger.info(`Comments from user ${commentsDTO.ownerId}  to offer ${commentsDTO.offerId} created`);
    return createResult.populate('ownerId');
  }

  public async getByOfferIg(offerId: string): Promise<DocumentType<CommentsEntity>[]> {
    return this.CommentsModel.find({ offerId }).populate('ownerId');
  }

  public async deleteByOfferIg(offerId: string): Promise<number> {
    const deleteResult = await this.CommentsModel.deleteMany({ offerId }).exec();
    return deleteResult.deletedCount;
  }
}
