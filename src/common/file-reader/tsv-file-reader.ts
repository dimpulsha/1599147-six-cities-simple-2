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

    const data= this.rawData.split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('##'))
      .map(([offerTitle, offerDescription, publicationDate, cityName, cityLatitude, cityLongitude, previewImg, offerImg, isPremium, rating, offerType, roomsCount, guestsCount, price, features, userName, email, avatarImg, isProUser, commentsCount, offerLatitude, offerLongitude]) => ({
        offerTitle,
        offerDescription,
        publicationDate: new Date(publicationDate),
        city: {name: cityName, latitude: parseFloat(cityLatitude), longitude: parseFloat(cityLongitude)},
        previewImg,
        offerImg: offerImg.split(';'),
        // offerImg,
        isPremium: isPremium === 'true',
        rating: parseFloat(rating),
        offerType: RoomType[offerType as 'apartment' | 'house' | 'room' | 'hotel'],
        roomsCount: parseInt(roomsCount, 10),
        guestsCount: parseInt(guestsCount, 10),
        price: parseFloat(price),
        features: features.split(';').map((name) => ({ name })),
        owner: {userName, email, avatarImg, isProUser:isProUser === 'true' },
        commentsCount: parseInt(commentsCount, 10),
        offerLocation: {latitude: parseFloat(offerLatitude),longitude:parseFloat(offerLongitude) },
      }));


    console.log(data[1].features);
    return data;

  }

}

