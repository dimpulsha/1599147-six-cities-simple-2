import { DocumentType } from '@typegoose/typegoose';
import { CommentsEntity } from './comments.entity.js';
import CreateCommentsDTO from './dto/create-comments.dto.js';


export interface CommentsDBServiceInterface {
  create(commentsDTO: CreateCommentsDTO): Promise<DocumentType<CommentsEntity>>;
  getByOfferIg(offerId: string): Promise<DocumentType<CommentsEntity>[]>;
  deleteByOfferIg(offerId: string): Promise<number>;
}
