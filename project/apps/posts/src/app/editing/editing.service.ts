import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { BlogTagRepository } from '../blog-tag/blog-tag.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { POST_NOT_FOUND, Post } from '@project/shared/shared-types';
import { BlogPostEntity } from '../blog-post/blog-post.entity';


@Injectable()
export class EditingService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post> {
    const tags = await this.blogTagRepository.find(dto.tags);
    const postEntity = new BlogPostEntity({ ...dto, tags, comments: [], commentsCount: 0, likesCount: 0 });
    return this.blogPostRepository.create(postEntity);
  }

  async deletePostId(id: number): Promise<void> {
    this.blogPostRepository.destroy(id);
  }

  async getPostId(id: number): Promise<Post> {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findById(id);
  }

  async getPostTitle(title: string) {

    const existPost = await this.blogPostRepository.findByTitle(title);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findByTitle(title);
  }


  async updatePostId(id: number, dto: CreatePostDto) {
    const tags = await this.blogTagRepository.find(dto.tags);
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    const blogPost = {
      ...dto,
      tags,
      isRepost: false,
      postId: id,
      commentsCount: existPost.commentsCount,
      likesCount: existPost.likesCount};

      const postEntity = new BlogPostEntity(blogPost)

   return this.blogPostRepository.update(id, postEntity);
  }

  public async repost(id: number, newUserId: string) {
    const existPost = await this.blogPostRepository.findById(id);

     if (!existPost) {
          throw new NotFoundException(POST_NOT_FOUND);
        }
        const blogPost = {
          ...existPost,
          isRepost: true,
          originUserId: existPost.userId,
          userId: newUserId};

    const postEntity = new BlogPostEntity(blogPost);

        return this.blogPostRepository
          .create(postEntity);
      }

}
