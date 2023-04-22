import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { PostQuery } from '../blog-post/qurey/post.query';


@Injectable()
export class ListPostsService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  public async getListPosts(query: PostQuery) {
    const existPost = await this.blogPostRepository.find(query);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.find(query);
  }



}
