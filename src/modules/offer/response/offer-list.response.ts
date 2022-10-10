import { Expose } from 'class-transformer';
import { City } from '../../../types/city.type';
import { RoomType } from '../../../types/room-type.enum.js';

export default class OfferListResponse {
  @Expose()
  public id!: string;

  @Expose()
  public offerTitle!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImg!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: RoomType;

  @Expose()
  public price!: string;

  @Expose()
  public commentsCount!: number;
}
