import { Comment} from '@project/shared/shared-types';

export class CommentEntity implements Comment {
  public _id: string;
  public postId: string;
  public text: string;
  public userId: string;

 constructor(commentPost: Comment) {
    this.fillEntity(commentPost);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(commentPost: Comment) {
    this._id = commentPost._id;
    this.postId = commentPost.postId;
    this.text = commentPost.text;
    this.postId = commentPost.postId;
    this.userId = commentPost.userId;

  }


}
