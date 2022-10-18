import { Expose, Type } from 'class-transformer';
import { RoomType } from '../../../types/room-type.enum.js';
import CitiesResponse from '../../cities/response/cities.response.js';

export default class OfferListResponse {
  @Expose()
  public id!: string;

  @Expose()
  public offerTitle!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  @Type(() => CitiesResponse)
  public cityId!: CitiesResponse;

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
