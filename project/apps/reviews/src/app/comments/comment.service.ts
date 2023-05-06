import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND, COMMENT_NOT_FOUND } from '@project/shared/shared-types';
import { CommentDto } from '@project/shared/shared-dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentQuery } from '@project/shared/shared-query';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  public async createComment(postId: number, dto: CommentDto) {

    const existComment = await this.commentRepository.findByPostUser(postId, dto.userId);
    if (existComment) {
     throw new ConflictException('Comment is already installed')
    }
    const newComment = {...dto, postId: postId};

    const postEntity = await new CommentEntity(newComment)

    return this.commentRepository
      .create(postEntity);
  }

  public async getPostId(query: CommentQuery, postId: number) {
    const isPostPublic = await this.commentRepository.getIsPostStatusPublic(postId);
    if (!isPostPublic) {
      throw new ConflictException('Post is not public')
     }
    const existComment = await this.commentRepository.findByPostId(query, postId);

    if (!existComment) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.commentRepository.findByPostId(query, postId);
  }

  public async delete(postId: number, userId: string) {
    const comment = await this.commentRepository.findByPostUser(postId, userId)
    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    return this.commentRepository.destroy(comment.commentId);
  }


}
