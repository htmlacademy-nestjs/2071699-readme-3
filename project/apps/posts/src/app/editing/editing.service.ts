import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { BlogTagRepository } from '../blog-tag/blog-tag.repository';
import { POST_NOT_FOUND, Post, PostState, PostType } from '@project/shared/shared-types';
import { BlogPostEntity } from '../blog-post/blog-post.entity';
import { CreatePostDto, EditPostDto } from '@project/shared/shared-dto';
import { BlogTagService } from '../blog-tag/blog-tag.service';


@Injectable()
export class EditingService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagRepository: BlogTagRepository,
    private readonly blogTagService: BlogTagService
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post> {

    const tagsArr = [];
    dto.tags.forEach((element) => {
    if (!tagsArr.includes(element.toLowerCase())) {
        tagsArr.push(element.toLowerCase());
    }
});

    const tags = await this.blogTagService.findAndCreateTag(tagsArr);
    const postEntity = new BlogPostEntity({ ...dto, tags, comments: [], commentsCount: 0, likesCount: 0, postState: PostState.Public });
    return this.blogPostRepository.create(postEntity);
  }

  async deletePostId(id: number): Promise<void> {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    this.blogPostRepository.destroy(id);
  }

  async getPostId(id: number): Promise<Post> {
    const existPost = await this.blogPostRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.blogPostRepository.findById(id);
  }

  async updatePostId(id: number, dto: EditPostDto) {
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
          originPostId: id,
          userId: newUserId};

    const postEntity = new BlogPostEntity(blogPost);

        return this.blogPostRepository
          .create(postEntity);
      }



      public async changeImg(postId: string, fileId: string) {
        const existPost = await this.blogPostRepository.findById(Number(postId));
        if (existPost.postType === PostType.Photo)
        {
          return this.blogPostRepository.updateImg(Number(postId), fileId);
        }
        return null
      }


}
