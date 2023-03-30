import { Like} from '@project/shared/shared-types';

export class LikeEntity implements Like {
  public _id: string;
  public postId: string;
  public userId: string;

 constructor(likePost: Like) {
    this.fillEntity(likePost);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(likePost: Like) {
    this._id = likePost._id;
    this.postId = likePost.postId;
    this.userId = likePost.userId;

  }


}
