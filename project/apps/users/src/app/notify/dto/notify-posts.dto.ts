import { PostForSend } from "@project/shared/shared-types";

export class NotifyPostsDto {

  public userId: string;

  public email: string;

  public posts: PostForSend[];

  public dateSend: string;

}
