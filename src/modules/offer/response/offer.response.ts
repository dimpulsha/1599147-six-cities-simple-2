import { Expose } from 'class-transformer';
import { City } from '../../../types/city.type';
import { Location } from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Feature } from '../../../types/feature.type.js';

export default class OfferItemResponse {
  @Expose()
  public id!: string;

  @Expose()
  public offerTitle!: string;

  @Expose()
  public offerDescription!: string;

  @Expose()
  public city!: City;

  @Expose()
  public previewImg!: string;

  @Expose()
  public offerImg!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public offerType!: RoomType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: Feature[];

  @Expose()
  public ownerId!: string;

  @Expose()
  public offerLocation!: Location;
}
