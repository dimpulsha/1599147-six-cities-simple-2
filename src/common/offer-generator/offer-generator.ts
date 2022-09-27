import dayjs from 'dayjs';
import { MockOffer } from '../../types/mock-data.type.js';
import { MockUser } from '../../types/mock-data.type.js';
import { City } from '../../types/city.type.js';
import { RoomType } from '../../types/room-type.enum.js';
import { generateRandomValue, getRandomItems, getRandomItem, randomBoolean } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_RATING = 0;
const MAX_RATING = 5;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {

  constructor(private readonly mockData: MockOffer) { }

  private createCityMock(city: City): string {
    return [city.name, city.latitude, city.longitude].join('##');
  }

  private createUserMock(user: MockUser): string {
    const userId = generateRandomValue(1, 1000000).toString();
    const isProUser = randomBoolean().toString();
    return [userId, user.userName, user.email, user.avatarImg, isProUser].join('##');
  }

  public generate(): string {
    const offerId = generateRandomValue(1, 1000000).toString();
    const offerTitle = getRandomItem<string>(this.mockData.offerTitle);
    const offerDescription = getRandomItem<string>(this.mockData.offerDescription);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const cityData = getRandomItem<City>(this.mockData.city);
    const city = this.createCityMock(cityData);
    const previewImg = getRandomItem<string>(this.mockData.previewImg);
    const offerImg = getRandomItems<string>(this.mockData.offerImg).join(';');
    const isPremium = randomBoolean().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const offerType = getRandomItem([RoomType.Apartment, RoomType.Hotel, RoomType.House, RoomType.Room]);
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const features = getRandomItems(this.mockData.features).join(';');
    const owner = this.createUserMock(getRandomItem(this.mockData.owner));
    const commentsCount = generateRandomValue(1, 300).toString();
    const offerLatitude = generateRandomValue(cityData.latitude - 0.00300, cityData.latitude + 0.00300, 6).toString();
    const offerLongitude = generateRandomValue(cityData.longitude - 0.00300, cityData.longitude + 0.00300, 6).toString();

    return [offerId, offerTitle, offerDescription, publicationDate, city, previewImg, offerImg, isPremium, rating, offerType, roomsCount, guestsCount, price, features, owner, commentsCount, offerLatitude, offerLongitude].join('##');
  }

}
