import { DocumentType } from '@typegoose/typegoose';
import { CommentsEntity } from './comments.entity.js';
import CreateCommentsDTO from './dto/create-comments.dto.js';


export interface CommentsDBServiceInterface {
  create(commentsDTO: CreateCommentsDTO): Promise<DocumentType<CommentsEntity>>;
  getByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentsEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number>;
}
