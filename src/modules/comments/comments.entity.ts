import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';

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

  @prop({ required: true })
  public offerId!: string;

  @prop({ required: true })
  public ownerId!: string;
}

export const CommentsModel = getModelForClass(CommentsEntity);
