import { Expose } from 'class-transformer';

export default class LoggedUserResponse {

  @Expose()
  public authToken!: string;

  @Expose()
  public email!: string;
}
