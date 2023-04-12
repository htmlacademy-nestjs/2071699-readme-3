import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';


@Injectable()
export class ListPostsService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  public async getListPosts() {
    const existPost = await this.blogPostRepository.find();

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.find();
  }

  public async getListPostsSort() {
    const existPost = await this.blogPostRepository.find();

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.find();
  }


}
