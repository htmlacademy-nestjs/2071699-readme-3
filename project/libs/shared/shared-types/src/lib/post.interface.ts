import {PostType} from './post-type.enum';
import {PostState} from './post-state.enum';
import { User } from './user.interface';

export interface Post extends User {
  _id?: string;
  title: string;
  video: string;
  tags?: string[];
  preview?: string;
  photo?: string;
  link?: string;
  postType: PostType;
  postState: PostState;
  isRepost: boolean;
}
