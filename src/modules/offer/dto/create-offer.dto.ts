import {IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max,  Min, IsBoolean, Length, IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsNumber, ValidateNested} from 'class-validator';
import { Location as LocationType} from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Type } from 'class-transformer';

class Location implements LocationType {
  @IsNumber({}, {message: 'latitude is required'})
  public latitude!: number;

  @IsNumber({}, {message: 'longitude is required'})
  public longitude!: number;
}

export default class CreateOfferDTO {

  @IsString({message: 'Offer title is required'})
  @Length(1, 100, { message: 'Offer title length must be from 1 to 100 characters' })
  public offerTitle!: string;

  @IsString({message: 'Offer description is required'})
  @Length(1, 1024, {message: 'Offer description length must be from 1 to 1024 characters'})
  public offerDescription!: string;

  @IsDateString({ message: 'Publication date must be valid ISO date' })
  public publicationDate!: Date;

  // todo - проверку на существование в БД
  @IsString({message: 'City is required'})
  @IsMongoId({ message: 'City must by valid MongoDB ID'})
  public cityId!: string;

  @IsString({message: 'Preview image is required'})
  public previewImg!: string;

  @IsNotEmpty({message: 'Offer image is required'})
  @IsArray({ message: 'Offer image list must be an Array of images' })
  @ArrayMinSize(6, {message: 'offerImages must contain 6 items'})
  @ArrayMaxSize(6, {message: 'offerImages must contain 6 items'})
  public offerImg!: string[];

  @IsNotEmpty({message: '"Premium" flag is required'})
  @IsBoolean({message: '"Premium" must be presented as boolean flag'})
  public isPremium!: boolean;

  @IsNotEmpty({message: 'Room type flag is required'})
  @IsEnum(RoomType, { message: 'Room type must be one of RoomType values' })
  public offerType!: RoomType;

  @IsInt({message: 'Rooms quantity must be an integer'})
  @Min(1, {message: 'Minimum 1 room'})
  @Max(8, {message: 'Maximum 8 rooms'})
  public roomsCount!: number;

  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(1, {message: 'Minimum 1 guest'})
  @Max(10, {message: 'Maximum 10 guests'})
  public guestsCount!: number;

  @IsInt({message: 'Price value must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100 000'})
  public price!: number;

  // todo - проверку на существование в БД
  @IsArray({ message: 'Features list must be an Array of images' })
  @IsMongoId({each: true, message: 'Features must by valid MongoDB ID'})
  public features!: string[];

  public ownerId!: string;

  @IsNotEmpty({ message: 'Location is required' })
  @ValidateNested()
  @Type(() => Location)
  public offerLocation!: Location;
}
