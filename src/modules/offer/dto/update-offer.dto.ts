import {IsArray, IsEnum, IsInt, IsMongoId, Max, Min, IsBoolean, Length,IsOptional, IsNumber, IsString, ArrayMinSize, ArrayMaxSize, ValidateNested  } from 'class-validator';
import { Location as LocationType } from '../../../types/location.type.js';
import { Type } from 'class-transformer';
import { RoomType } from '../../../types/room-type.enum.js';
import { Feature as FeatureType} from '../../../types/feature.type.js';

class Location implements LocationType {
  @IsNumber({}, {message: 'latitude is required'})
  public latitude!: number;

  @IsNumber({}, {message: 'longitude is required'})
  public longitude!: number;
}

class Feature implements FeatureType {
  @IsString({message: 'Feature name is required'})
  public name!: string;
}

export default class UpdateOfferDTO {

  @IsOptional()
  @Length(1, 100, {message: 'Offer title length must be from 1 to 100 characters'})
  public offerTitle?: string;

  @IsOptional()
  @Length(1, 1024, { message: 'Offer description length must be from 1 to 1024 characters' })
  public offerDescription?: string;

  @IsOptional()
  @IsMongoId({ message: 'City must by valid MongoDB ID' })
  public cityId?: string;

  @IsOptional()
  public previewImg?: string;

  @IsOptional()
  @IsArray({ message: 'Offer image list must be an Array of images' })
  @ArrayMinSize(6, {message: 'offerImages must contain 6 items'})
  @ArrayMaxSize(6, {message: 'offerImages must contain 6 items'})
  public offerImg?: string[];

  @IsOptional()
  @IsBoolean({message: '"Premium" must be presented as boolean flag'})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(RoomType, {message: 'Room type must be one of RoomType values'} )
  public offerType?: RoomType;

  @IsOptional()
  @IsInt({message: 'Rooms quantity must be an integer'})
  @Min(1, {message: 'Minimum 1 room'})
  @Max(1, {message: 'Maximum 8 rooms'})
  public roomsCount?: number;

  @IsOptional()
  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(1, {message: 'Minimum 1 guest'})
  @Max(1, {message: 'Maximum 10 guests'})
  public guestsCount?: number;

  @IsOptional()
  @IsInt({message: 'Price value must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100 000'})
  public price?: number;

  @IsOptional()
  @IsArray({message: 'Features list must be an Array of images'})
  @ValidateNested()
  @Type(() => Feature)
  public features!: Feature[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  public offerLocation!: Location;
}
