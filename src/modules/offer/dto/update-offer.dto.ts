import {IsArray, IsEnum, IsInt, IsMongoId, Max, Min, IsBoolean, Length,IsOptional } from 'class-validator';
import { Location } from '../../../types/location.type.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Feature } from '../../../types/feature.type.js';

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
  public features?: Feature[];

  // todo проверка на тип данных?
  @IsOptional()
  public offerLocation?: Location;
}
