import { Expose } from 'class-transformer';

export default class CitiesResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: string;
}
