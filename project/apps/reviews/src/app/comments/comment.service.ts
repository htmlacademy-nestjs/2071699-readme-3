import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentQuery } from './qurey/comment.query';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  public async createComment(dto: CommentDto) {

    const newComment = {...dto};

    const postEntity = await new CommentEntity(newComment)

    return this.commentRepository
      .create(postEntity);
  }

  public async getPostId(query: CommentQuery, postId: number) {
    const existComment = await this.commentRepository.findByPostId(query, postId);

    if (!existComment) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.commentRepository.findByPostId(query, postId);
  }

  public async delete(id: number) {
    return this.commentRepository.destroy(id);
  }


}
