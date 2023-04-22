import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './qurey/comment.query';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject()

    const commentNew = await this.prisma.comment.create({
      data: {
        ...entityData
    }});
    return commentNew
  }


  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public async findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId
      },
      include: {
        post: true,
      }
    });
  }


  public async findByPostId({limit, page}: CommentQuery, postId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        postId: postId
      },
      take: limit,
      include: {
        post: true
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });


  }

  public update(_id: number, _item: CommentEntity): Promise<Comment> {
    return Promise.resolve(undefined);
  }
}
