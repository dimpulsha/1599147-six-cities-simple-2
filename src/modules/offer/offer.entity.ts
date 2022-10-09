import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { City } from '../../types/city.type';
import { Location } from '../../types/location.type.js';
import { RoomType } from '../../types/room-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { FeatureEntity } from '../features/feature.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true, minlength: 10, maxlength: 100,})
  public offerTitle!: string;

  @prop({required: true, minlength: 20, maxlength: 1024,})
  public offerDescription!: string;

  @prop({required: true})
  public publicationDate!: Date;

  @prop({required: true})
  public city!: City;

  @prop({required: true, trim: true})
  public previewImg!: string;

  @prop({required: true})
  public offerImg!: string[];

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true, default: 0})
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: RoomType})
  public offerType!: RoomType;

  @prop({required: true, min: 1, max: 8})
  public roomsCount!: number;

  @prop({required: true, min: 1, max: 10})
  public guestsCount!: number;

  @prop({required: true, min: 100, max:100000})
  public price!: number;

  @prop({
    required: true,
    ref: FeatureEntity,
    default: [],
    _id: false})
  public features!: Ref<FeatureEntity>[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public ownerId!: Ref<UserEntity>;

  @prop({required: true, default: 0})
  public commentsCount!: number;

  @prop({required: true})
  public offerLocation!: Location;

}

export const OfferModel = getModelForClass(OfferEntity);
