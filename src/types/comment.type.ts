import { User } from './user.type';

export type Comment = {
  commentText: string;
  commentDateTime?: string;
  rate: number;
  commentOwner?: User;
  offerId: string;
  ownerId: string;
}
