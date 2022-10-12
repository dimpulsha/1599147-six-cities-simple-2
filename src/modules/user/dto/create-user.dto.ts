export default class CreateUserDto {
  public userName!: string ;
  public email!: string ;
  public avatarImg?: string;
  public password!: string;
  public isProUser!: boolean;
}
