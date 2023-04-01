import {PostType} from './post-type.enum';
import {PostState} from './post-state.enum';

export interface Post {
  _id?: string;
  title?: string;
  video?: string;
  tags?: string[];
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
}
