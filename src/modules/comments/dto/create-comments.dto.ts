import { Max, Min, Length, IsString, IsNotEmpty } from 'class-validator';

export default class CreateCommentsDTO {

  @IsString({ message: 'Comments text is required' })
  @Length(5, 100, { message: 'Comments length must be from 1 to 100 characters' })
  public commentText!: string;

  @IsNotEmpty({ message: 'Rating value is required' })
  @Min(1, {message: 'Minimum 1 '})
  @Max(5, {message: 'Maximum 5 '})
  public rate!: number;

  public offerId!: string;

  public ownerId!: string;
}
