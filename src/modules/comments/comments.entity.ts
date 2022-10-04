import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentsEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentsEntity extends defaultClasses.TimeStamps {

  @prop({ require: true, minlength: 5, maxlength: 1024 })
  public commentsText!: string;

  @prop({required: true, min: 1, max: 5})
  public rate!: number;

  @prop({ ref: OfferEntity, required: true})
  public offerId!: Ref<OfferEntity>;

  @prop({ ref: UserEntity, required: true})
  public ownerId!: Ref<UserEntity>;
}

export const CommentsModel = getModelForClass(CommentsEntity);
