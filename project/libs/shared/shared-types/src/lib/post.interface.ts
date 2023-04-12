import {PostType} from './post-type.enum';
import {PostState} from './post-state.enum';
import { Tag } from './tag.interface';
import { Comment } from './comment.interface';

export interface Post {
  _id?: string;
  title?: string;
  video?: string;
  tags?: Tag[];
  preview?: string;
  text?: string;
  quote?: string;
  authQuote?: string;
  photo?: string;
  link?: string;
  descriptionLink?: string;
  postType: PostType;
  postState: PostState;
  isRepost: boolean;
  userId: string;
  originUserId?: string;
  comments?: Comment[];
}
