import { Post, PostState, PostType, Tag} from '@project/shared/shared-types';
import { Entity } from '@project/util/util-types';

export class BlogPostEntity implements Entity<BlogPostEntity> , Post {
  public _id: string;
  public title: string;
  public content: string;
  public tags: Tag[];
  public addInfo: string;
  public postType: PostType;
  public postState: PostState;
  public isRepost: boolean;
  public userId: string;
  public originUserId: string;
  public commentsCount: number;
  public likesCount: number;

 constructor(blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject(): BlogPostEntity {
    return {
      ...this,
      tags: this.tags.map(({ tagId }) => ({ tagId }))
    };
  }

  public fillEntity(blogPost: Post) {
    this._id = blogPost._id;
    this.title = blogPost.title;
    this.content = blogPost.content;
    this.tags = [...blogPost.tags];
    this.addInfo = blogPost.addInfo;
    this.postType = blogPost.postType;
    this.postState = blogPost.postState;
    this.isRepost = blogPost.isRepost;
    this.userId = blogPost.userId;
    this.originUserId = blogPost.originUserId;
    this.commentsCount = blogPost.commentsCount;
    this.likesCount = blogPost.likesCount;
  }


}
