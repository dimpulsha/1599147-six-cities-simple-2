import { Offer } from '../types/offer.type.js';
import { RoomType } from '../types/room-type.enum.js';

export const createOffer = (row: string) => {
  const [ offerTitle, offerDescription, publicationDate, cityName, cityLatitude, cityLongitude, previewImg, offerImg, isPremium, offerType, roomsCount, guestsCount, price, features, userName, email, avatarImg, isProUser, offerLatitude, offerLongitude] = row.replace('\n', '').split('##');

  return {
    offerTitle,
    offerDescription,
    publicationDate: new Date(publicationDate),
    city: { name: cityName, latitude: parseFloat(cityLatitude), longitude: parseFloat(cityLongitude) },
    previewImg,
    offerImg: offerImg.split(';'),
    isPremium: isPremium === 'true',
    // rating: parseFloat(rating),
    offerType: RoomType[offerType as 'apartment' | 'house' | 'room' | 'hotel'],
    roomsCount: parseInt(roomsCount, 10),
    guestsCount: parseInt(guestsCount, 10),
    price: parseFloat(price),
    features: features.split(';').map((name) => ({ name })),
    owner: { userName, email, avatarImg, isProUser: isProUser === 'true' },
    // commentsCount: parseInt(commentsCount, 10),
    offerLocation: { latitude: parseFloat(offerLatitude), longitude: parseFloat(offerLongitude) },
  } as Offer;
};
