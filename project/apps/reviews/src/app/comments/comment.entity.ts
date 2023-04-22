import { Comment} from '@project/shared/shared-types';

export class CommentEntity implements Comment {
  public commentId: number;
  public postId: number;
  public message: string;
  public userId: string;

 constructor(commentPost: Comment) {
    this.fillEntity(commentPost);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(commentPost: Comment) {
    this.commentId = commentPost.commentId;
    this.postId = commentPost.postId;
    this.message = commentPost.message;
    this.userId = commentPost.userId;

  }


}
