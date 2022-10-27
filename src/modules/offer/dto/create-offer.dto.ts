import {IsArray, IsEnum, IsInt, Max,  Min, IsBoolean, Length, IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsNumber, ValidateNested} from 'class-validator';
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
  @Length(OfferTitle.Min, OfferTitle.Max, { message: `Offer title length must be from ${OfferTitle.Min} to ${OfferTitle.Max} characters` })
  public offerTitle!: string;

  @IsString({message: 'Offer description is required'})
  @Length(OfferDescription.Min, OfferDescription.Max, {message: `Offer description length must be from ${OfferDescription.Min} to ${OfferDescription.Max} characters`})
  public offerDescription!: string;

  @IsString({message: 'City is required'})
  public cityId!: string;

  @IsString({message: 'Preview image is required'})
  public previewImg!: string;

  @IsNotEmpty({message: 'Offer image is required'})
  @IsArray({ message: 'Offer image list must be an Array of images' })
  @ArrayMinSize(OfferImagesCount.Min, {message: `offerImages must contain minimum ${OfferImagesCount.Min}items`})
  @ArrayMaxSize(OfferImagesCount.Max, {message: `offerImages must contain maximum ${OfferImagesCount.Max} items`})
  public offerImg!: string[];

  @IsNotEmpty({message: '"Premium" flag is required'})
  @IsBoolean({message: '"Premium" must be presented as boolean flag'})
  public isPremium!: boolean;

  @IsNotEmpty({message: 'Room type flag is required'})
  @IsEnum(RoomType, { message: 'Room type must be one of RoomType values' })
  public offerType!: RoomType;

  @IsInt({message: 'Rooms quantity must be an integer'})
  @Min(RoomsCount.Min, {message: `Minimum ${RoomsCount.Min} room`})
  @Max(RoomsCount.Max, {message: `Maximum ${RoomsCount.Max} rooms`})
  public roomsCount!: number;

  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(GuestsCount.Min, {message: `Minimum ${GuestsCount.Min}guest`})
  @Max(GuestsCount.Max, {message: `Maximum ${GuestsCount.Max} guests`})
  public guestsCount!: number;

  @IsInt({message: 'Price value must be an integer'})
  @Min(Price.Min, {message: `Minimum price is ${Price.Min}`})
  @Max(Price.Max, {message: `Maximum price is ${Price.Max}`})
  public price!: number;

  @IsArray({ message: 'Features list must be an Array of images' })
  public features!: string[];

  public ownerId!: string;

  @IsNotEmpty({ message: 'Location is required' })
  @ValidateNested()
  @Type(() => Location)
  public offerLocation!: Location;
}
