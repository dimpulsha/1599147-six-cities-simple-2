import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class CommentsResponse {
  @Expose()
  public id!: string;

  @Expose()
  public commentsText!: string;

  @Expose()
  public rate!: number;

  @Expose()
  public offerId!: string;

  @Expose()
  @Type(() => UserResponse)
  public ownerId!: UserResponse;
}
