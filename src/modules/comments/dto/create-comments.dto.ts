import { IsMongoId, Max, Min, Length, IsString, IsNotEmpty } from 'class-validator';

export default class CreateCommentsDTO {

  @IsString({ message: 'Offer title is required' })
  @Length(5, 100, { message: 'Comments length must be from 1 to 100 characters' })
  public commentText!: string;

  @IsNotEmpty({ message: 'Rating value is required' })
  @Min(1, {message: 'Minimum 1 room'})
  @Max(8, {message: 'Maximum 8 rooms'})
  public rate!: number;

  @IsString({message: 'Offer Id is required'})
  @IsMongoId({ message: 'Offer Id must by valid MongoDB ID'})
  public offerId!: string;

  public ownerId!: string;
}
