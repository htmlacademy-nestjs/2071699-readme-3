import { Post, PostState, PostType} from '@project/shared/shared-types';

export class BlogPostEntity implements Post {
  public _id: string;
  public title: string;
  public video: string;
  public tags: string[];
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

 constructor(blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogPost: Post) {
    this._id = blogPost._id;
    this.title = blogPost.title;
    this.video = blogPost.video;
    this.tags = blogPost.tags;
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
  }


}
