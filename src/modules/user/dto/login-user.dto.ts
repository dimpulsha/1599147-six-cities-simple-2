import { IsEmail, Length } from 'class-validator';
import { Password } from '../../../app.config.js';

export default class LoginUserDto {

  @IsEmail({}, {message:'Email must be valid e-mail address'})
  public email!: string;

  @Length(Password.Min, Password.Max, {message: `Password length must be from ${Password.Min} to ${Password.Max} characters`})
  public password!: string;
}
