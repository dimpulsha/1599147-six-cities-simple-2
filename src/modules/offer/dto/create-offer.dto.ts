import {IsArray, IsEnum, IsInt, IsMongoId, Max,  Min, IsBoolean, Length, IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsNumber, ValidateNested} from 'class-validator';
import { Location as LocationType} from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Type } from 'class-transformer';
import { GuestsCount, OfferTitle, OfferDescription, Price, RoomsCount, OfferImagesCount } from '../../../app.config.js';

class Location implements LocationType {
  @IsNumber({}, {message: 'latitude is required'})
  public latitude!: number;

  @IsNumber({}, {message: 'longitude is required'})
  public longitude!: number;
}

export default class CreateOfferDTO {

  @IsString({message: 'Offer title is required'})
  @Length(OfferTitle.Min, OfferTitle.Max, { message: 'Offer title length must be from 1 to 100 characters' })
  public offerTitle!: string;

  @IsString({message: 'Offer description is required'})
  @Length(OfferDescription.Min, OfferDescription.Max, {message: 'Offer description length must be from 1 to 1024 characters'})
  public offerDescription!: string;

  @IsString({message: 'City is required'})
  @IsMongoId({ message: 'City must by valid MongoDB ID'})
  public cityId!: string;

  @IsString({message: 'Preview image is required'})
  public previewImg!: string;

  @IsNotEmpty({message: 'Offer image is required'})
  @IsArray({ message: 'Offer image list must be an Array of images' })
  @ArrayMinSize(OfferImagesCount.Min, {message: 'offerImages must contain 6 items'})
  @ArrayMaxSize(OfferImagesCount.Max, {message: 'offerImages must contain 6 items'})
  public offerImg!: string[];

  @IsNotEmpty({message: '"Premium" flag is required'})
  @IsBoolean({message: '"Premium" must be presented as boolean flag'})
  public isPremium!: boolean;

  @IsNotEmpty({message: 'Room type flag is required'})
  @IsEnum(RoomType, { message: 'Room type must be one of RoomType values' })
  public offerType!: RoomType;

  @IsInt({message: 'Rooms quantity must be an integer'})
  @Min(RoomsCount.Min, {message: 'Minimum 1 room'})
  @Max(RoomsCount.Max, {message: 'Maximum 8 rooms'})
  public roomsCount!: number;

  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(GuestsCount.Min, {message: 'Minimum 1 guest'})
  @Max(GuestsCount.Max, {message: 'Maximum 10 guests'})
  public guestsCount!: number;

  @IsInt({message: 'Price value must be an integer'})
  @Min(Price.Min, {message: 'Minimum price is 100'})
  @Max(Price.Max, {message: 'Maximum price is 100 000'})
  public price!: number;

  @IsArray({ message: 'Features list must be an Array of images' })
  @IsMongoId({each: true, message: 'Features must by valid MongoDB ID'})
  public features!: string[];

  public ownerId!: string;

  @IsNotEmpty({ message: 'Location is required' })
  @ValidateNested()
  @Type(() => Location)
  public offerLocation!: Location;
}
