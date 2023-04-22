import { Like} from '@project/shared/shared-types';

export class LikeEntity implements Like {
  public likeId: number;
  public postId: number;
  public userId: string;

 constructor(likePost: Like) {
    this.fillEntity(likePost);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(likePost: Like) {
    this.likeId = likePost.likeId;
    this.postId = likePost.postId;
    this.userId = likePost.userId;

  }


}
