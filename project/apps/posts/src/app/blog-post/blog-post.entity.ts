import { Post, PostState, PostType, Tag, Comment} from '@project/shared/shared-types';
import { Entity } from '@project/util/util-types';

export class BlogPostEntity implements Entity<BlogPostEntity> , Post {
  public _id: string;
  public title: string;
  public video: string;
  public tags: Tag[];
  public preview: string;
  public text: string;
  public quote: string;
  public authQuote: string;
  public photo: string;
  public link: string;
  public descriptionLink: string;
  public postType: PostType;
  public postState: PostState;
  public isRepost: boolean;
  public userId: string;
  public originUserId: string;
  public comments: Comment[];

 constructor(blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject(): BlogPostEntity {
    return {
      ...this,
      tags: this.tags.map(({ tagId }) => ({ tagId })),
      comments: this.comments.map(({ commentId }) => ({ commentId }))
    };
  }

  public fillEntity(blogPost: Post) {
    this._id = blogPost._id;
    this.title = blogPost.title;
    this.video = blogPost.video;
    this.tags = [];
    this.preview = blogPost.preview;
    this.text = blogPost.text;
    this.quote = blogPost.quote;
    this.authQuote = blogPost.authQuote;
    this.photo = blogPost.photo;
    this.link = blogPost.link;
    this.descriptionLink = blogPost.descriptionLink;
    this.postType = blogPost.postType;
    this.postState = blogPost.postState;
    this.isRepost = blogPost.isRepost;
    this.userId = blogPost.userId;
    this.originUserId = blogPost.originUserId;
    this.comments = [];
  }


}
