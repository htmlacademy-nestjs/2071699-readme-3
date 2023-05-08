import { Entity } from '@project/util/util-types';
import { NotifyPosts, PostForSend } from '@project/shared/shared-types';

export class NewPostsEntity implements Entity<NewPostsEntity>, NotifyPosts {
  public id: string;
  public posts: PostForSend[];
  public userId: string;
  public email: string;
  public dateSend: string;

  constructor(emailSubscriber: NotifyPosts) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.posts = entity.posts;
    this.userId = entity.userId;
    this.email = entity.email;
    this.dateSend = entity.dateSend;
    this.id = entity.id ?? '';
  }

  public toObject(): NewPostsEntity {
    return { ...this };
  }
}
