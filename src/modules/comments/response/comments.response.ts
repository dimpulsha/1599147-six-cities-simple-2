import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class CommentsResponse {
  @Expose()
  public id!: string;

  @Expose()
  public commentText!: string;

  @Expose()
  public rate!: number;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public offerId!: string;

  @Expose()
  @Type(() => UserResponse)
  public ownerId!: UserResponse;
}
