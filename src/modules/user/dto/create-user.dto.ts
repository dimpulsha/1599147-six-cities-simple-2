import { IsBoolean, IsEmail, Length } from 'class-validator';
import { UserName, Password } from '../../../app.config.js';

export default class CreateUserDto {

  @Length(UserName.Min, UserName.Max, {message: `UserName length must be from ${UserName.Min} to ${UserName.Max} characters`})
  public userName!: string;

  @IsEmail({}, {message:'Email must be valid e-mail address'})
  public email!: string;

  public avatarImg?: string;

  @Length(Password.Min, Password.Max, {message: `Password length must be from ${Password.Min} to ${Password.Max} characters`})
  public password!: string;

  @IsBoolean({message: 'Pro User must be presented as boolean flag'})
  public isProUser!: boolean;
}
