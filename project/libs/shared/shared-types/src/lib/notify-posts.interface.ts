import { PostForSend } from "./post-for-send.interface";

export interface NotifyPosts {
  id?: string;
  posts: PostForSend[];
  userId: string;
  email: string;
  dateSend: string
}
