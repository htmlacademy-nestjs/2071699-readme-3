import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';


@Injectable()
export class UserFeedService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getUserFeed() {
    const existPost = await this.blogPostRepository.find();

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.find();
  }


}
