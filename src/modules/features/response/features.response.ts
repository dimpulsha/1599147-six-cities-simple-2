import { Expose } from 'class-transformer';

export default class FeaturesResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
