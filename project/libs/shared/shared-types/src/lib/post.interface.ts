import {PostType} from './post-type.enum';
import {PostState} from './post-state.enum';
import { Tag } from './tag.interface';
import { Comment } from './comment.interface';

export interface Post {
  _id?: string;
  title?: string;
  content?: string
  addInfo?: string;
  tags?: Tag[];
  postType: PostType;
  postState: PostState;
  isRepost: boolean;
  userId: string;
  originUserId?: string;
  originPostId?: number;
  comments?: Comment[];
  commentsCount?: number;
  likesCount?: number;
  createdAt?: Date;
}
