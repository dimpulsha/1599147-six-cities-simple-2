import { City } from './city.type.js';
import { Location } from './location.type.js';
import { RoomType } from './room-type.enum.js';
import { Feature } from './feature.type.js';
import { User } from './user.type.js';

export type Offer = {
  offerName: string;
  offerDescription: string;
  publicationDate: string;
  city: City;
  previewImg: string;
  offerImg: string[];
  isPremium: boolean;
  rating?: number;
  offerType: RoomType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: Feature[];
  owner: User;
  commentsCount?: number;
  offerLocation: Location;
};
