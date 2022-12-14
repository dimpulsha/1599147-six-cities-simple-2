import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { Location } from '../../types/location.type.js';
import { RoomType } from '../../types/room-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { FeatureEntity } from '../features/feature.entity.js';
import { CityEntity } from '../cities/cities.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }, options: {allowMixed: 0 }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public offerTitle!: string;

  @prop({required: true})
  public offerDescription!: string;

  @prop({ required: true, default: () => Date() })
  public publicationDate!: Date;

  @prop({
    required: true,
    ref: CityEntity,
    _id: false})
  public cityId!:  Ref<CityEntity>;

  @prop({required: true, trim: true, default: 'preview-test.jpg'})
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

  @prop({ required: true })
  public roomsCount!: number;

  @prop({required: true})
  public guestsCount!: number;

  @prop({required: true})
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
