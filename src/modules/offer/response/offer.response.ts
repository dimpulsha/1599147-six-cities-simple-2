import { Expose, Type } from 'class-transformer';
import { Location } from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import FeaturesResponse from '../../features/response/features.response.js';
import UserResponse from '../../user/response/user.response.js';
import CitiesResponse from '../../cities/response/cities.response.js';

export default class OfferItemResponse {
  @Expose()
  public id!: string;

  @Expose()
  public offerTitle!: string;

  @Expose()
  public offerDescription!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  @Type(() => CitiesResponse)
  public cityId!: CitiesResponse;

  @Expose()
  public previewImg!: string;

  @Expose()
  public offerImg!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: RoomType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  @Type(() => FeaturesResponse)
  public features!: FeaturesResponse[];

  @Expose()
  @Type(() => UserResponse)
  public ownerId!: UserResponse;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public offerLocation!: Location;
}
