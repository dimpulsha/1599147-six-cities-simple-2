import {IsBoolean, IsEmail, Length} from 'class-validator';


export default class CreateUserDto {

  @Length(1, 15, {message: 'UserName length must be from 1 to 15 characters'})
  public userName!: string;

  @IsEmail({}, {message:'Email must be valid e-mail address'})
  public email!: string;

  public avatarImg?: string;

  @Length(1, 12, {message: 'Password length must be from 6 to 12 characters'})
  public password!: string;

  @IsBoolean({message: 'Pro User must be presented as boolean flag'})
  public isProUser!: boolean;
}
