import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository
  ) {}

  public async createComment(dto: CommentDto) {

    const newComment = {...dto};

    const postEntity = await new CommentEntity(newComment)

    return this.commentRepository
      .create(postEntity);
  }

  public async getPostId(postId: string) {
    const existComment = await this.commentRepository.findByPostId(postId);

    if (!existComment) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.commentRepository.findByPostId(postId);
  }

  public async delete(id: string) {
    return this.commentRepository.destroy(id);
  }


}
