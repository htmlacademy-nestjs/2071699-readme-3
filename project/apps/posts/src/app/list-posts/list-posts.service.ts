import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostMemoryRepository } from '../blog-post/blog-post-memory.repository';
import { POST_NOT_FOUND } from '@project/shared/shared-types';


@Injectable()
export class ListPostsService {
  constructor(
    private readonly blogPostRepository: BlogPostMemoryRepository
  ) {}

  public async getListPosts() {
    const existPost = await this.blogPostRepository.findAll();

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findAll();
  }

  public async getListPostsSort() {
    const existPost = await this.blogPostRepository.findAll();

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findAll();
  }


}
