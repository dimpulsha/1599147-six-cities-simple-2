export const DEFAULT_OFFER_COUNT = 60;
export const DEFAULT_COMMENTS_COUNT = 50;
export const DEFAULT_AVATAR = 'default-avatar.svg';
export const JWT_ALGORITHM = 'HS256';
export enum OfferTitle {
  Min = 10,
  Max = 100
}
export enum OfferDescription {
  Min = 20,
  Max = 1024
}
export enum RoomsCount {
  Min = 1,
  Max = 8
}
export enum GuestsCount {
  Min = 1,
  Max = 10
}
export enum Price {
  Min = 100,
  Max = 100000
}
export enum UserName {
  Min = 1,
  Max = 15
}

export enum OfferImagesCount {
  Min = 6,
  Max = 6
}

export const DEFAULT_STATIC_IMAGES = [
  'default-avatar.jpg',
  'default-avatar.svg',
];

export const STATIC_RESOURCE_FIELDS = [
  'avatarImg',
  'previewImg',
  'offerImg'
];
