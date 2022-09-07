import { User } from './user.type';

export type Comment = {
  commentText: string;
  commentDateTime?: string;
  commentRating?: number;
  commentOwner: User;
}
