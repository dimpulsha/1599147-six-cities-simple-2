import { City } from '../../../types/city.type';
import { Location } from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Feature } from '../../../types/feature.type.js';

// import { User } from '../../../types/user.type.js';

export default class CreateOfferDTO {
  public offerTitle!: string;
  public offerDescription!: string;
  // public publicationDate!: Date;
  public city!: City;
  public previewImg!: string;
  public offerImg!: string[];
  public isPremium!: boolean;
  // public rating!: number;
  public offerType!: RoomType;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public features!: Feature[];
  public ownerId!: string;
  // public commentsCount!: number;
  public offerLocation!: Location;
}
