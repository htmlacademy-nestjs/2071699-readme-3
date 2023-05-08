import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { PostQuery } from '@project/shared/shared-query';


@Injectable()
export class ListPostsService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  public async getListPosts(query: PostQuery) {
    const existPost = await this.blogPostRepository.findAll(query);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findAll(query);
  }

  public async getListPostsAfterDate(date: Date) {
    return this.blogPostRepository.findPostsAfterDate(date);
  }

  public async getListPostsDraft(userId: string) {
    const existPost = await this.blogPostRepository.findDraft(userId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findDraft(userId);
  }

  async getPostTitle(title: string) {

    const existPost = await this.blogPostRepository.findByTitle(title);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findByTitle(title);
  }

  public async getCountPostsUser(userId: string) {
    const existPost = await this.blogPostRepository.findUserId(userId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return (await this.blogPostRepository.findUserId(userId)).length;
  }
}
