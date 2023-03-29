import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostMemoryRepository } from '../blog-post/blog-post-memory.repository';
import { BlogPostEntity } from '../blog-post/blog-post.entity';
import { POST_NOT_FOUND } from './editing.constant';


@Injectable()
export class EditingService {
  constructor(
    private readonly blogPostRepository: BlogPostMemoryRepository
  ) {}

  public async createPost(dto: CreatePostDto) {

    const blogPost = {
      ...dto,
      isRepost: false};

    const postEntity = await new BlogPostEntity(blogPost)

    return this.blogPostRepository
      .create(postEntity);
  }

  public async getPostId(id: string) {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findById(id);
  }

  public async getPostTitle(title: string) {

    const existPost = await this.blogPostRepository.findByTitle(title);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findByTitle(title);
  }

  public async deletePostId(id: string) {
    return this.blogPostRepository.destroy(id);
  }

  public async updatePostId(id: string, dto: CreatePostDto) {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    const blogPost = {
      ...dto,
      isRepost: false,
      _id: id};

      const postEntity = await new BlogPostEntity(blogPost)

   return this.blogPostRepository.update(id, postEntity);
  }
}
