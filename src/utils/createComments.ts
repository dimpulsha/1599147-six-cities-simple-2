import { Comment } from '../types/comment.type.js';

export const createComments = (row: string) => {
  const [ commentText, rate, offerId, ownerId] = row.replace('\n', '').split('##');

  return {
    commentText,
    rate: parseInt(rate, 10),
    offerId,
    ownerId

  } as Comment;
};
