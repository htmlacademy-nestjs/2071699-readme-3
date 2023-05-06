import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { PostQuery } from '@project/shared/shared-query';


@Injectable()
export class UserFeedService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getUserFeed(query: PostQuery) {
    const existPost = await this.blogPostRepository.findAll(query);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findAll(query);
  }


}
