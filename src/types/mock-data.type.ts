import { City } from './city.type.js';
import { Location } from './location.type';

type MockUser = {
  userName: string;
  email: string;
  avatarImg: string;
}

export type MockOffer = {
  offerTitle: string[];
  offerDescription: string[];
  city: City[];
  previewImg: string[];
  offerImg: string[];
  offerType: string[];
  features: string[];
  owner: MockUser[];
  offerLocation: Location[]
}
