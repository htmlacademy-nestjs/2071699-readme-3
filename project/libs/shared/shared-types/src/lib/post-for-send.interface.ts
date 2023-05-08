import {PostType} from './post-type.enum';

export interface PostForSend {
  _id?: string;
  title?: string;
  content: string
  addInfo?: string;
  postType: PostType;
  userId?: string;
  createDate?: Date;
}
