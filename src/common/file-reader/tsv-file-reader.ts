import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { RoomType } from '../../types/room-type.enum.js';
import { FileReaderInterface } from './file-reader.interface.js';

export class TSVFileReader implements FileReaderInterface  {
  private rawData = '';

  constructor(public filename: string) { }
  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
    // this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public rawToArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData.split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('##'))
      .map(([offerId, offerTitle, offerDescription, publicationDate, cityName, cityLatitude, cityLongitude, previewImg, offerImg, isPremium, rating, offerType, roomsCount, guestsCount, price, features, userId, userName, email, avatarImg, isProUser, commentsCount, offerLatitude, offerLongitude]) => ({
        offerId: parseInt(offerId, 10),
        offerTitle,
        offerDescription,
        publicationDate: new Date(publicationDate),
        city: {name: cityName, latitude: parseFloat(cityLatitude), longitude: parseFloat(cityLongitude)},
        previewImg,
        offerImg: offerImg.split(';'),
        // offerImg,
        isPremium: isPremium === 'true',
        rating: parseFloat(rating),
        offerType: RoomType[offerType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        roomsCount: parseInt(roomsCount, 10),
        guestsCount: parseInt(guestsCount, 10),
        price: parseFloat(price),
        features: features.split(';').map((name) => ({ name })),
        owner: {userId: parseInt(userId, 10), userName, email, avatarImg, isProUser:isProUser === 'true' },
        commentsCount: parseInt(commentsCount, 10),
        offerLocation: {latitude: parseFloat(offerLatitude),longitude:parseFloat(offerLongitude) },
      }));

  }

}

