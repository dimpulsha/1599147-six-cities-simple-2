import {IsEmail, Length} from 'class-validator';

export default class LoginUserDto {

  @IsEmail({}, {message:'Email must be valid e-mail address'})
  public email!: string;

  @Length(1, 12, {message: 'Password length must be from 6 to 12 characters'})
  public password!: string;
}
