import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { City } from '../../types/city.type';
import { Location } from '../../types/location.type.js';
import { RoomType } from '../../types/room-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { FeatureEntity } from '../features/feature.entity.js';
import { GuestsCount, OfferTitle, OfferDescription, Price, RoomsCount } from '../../app.config.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true, minlength: OfferTitle.Min, maxlength: OfferTitle.Max,})
  public offerTitle!: string;

  @prop({required: true, minlength: OfferDescription.Min, maxlength: OfferDescription.Max,})
  public offerDescription!: string;

  @prop({ required: true })
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

  @prop({required: true, min: RoomsCount.Min, max: RoomsCount.Max})
  public roomsCount!: number;

  @prop({required: true, min: GuestsCount.Min, max: GuestsCount.Max})
  public guestsCount!: number;

  @prop({required: true, min: Price.Min, max:Price.Max})
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
