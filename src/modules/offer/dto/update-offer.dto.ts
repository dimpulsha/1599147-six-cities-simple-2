import { City } from '../../../types/city.type';
import { Location } from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Feature } from '../../../types/feature.type.js';

export default class UpdateOfferDTO {
  public offerTitle?: string;
  public offerDescription?: string;
  public city?: City;
  public previewImg?: string;
  public offerImg?: string[];
  public isPremium?: boolean;
  public offerType?: RoomType;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public features?: Feature[];
  public offerLocation?: Location;
}
