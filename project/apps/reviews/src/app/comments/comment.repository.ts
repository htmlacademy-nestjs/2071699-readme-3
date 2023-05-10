import { Injectable } from '@nestjs/common';
import { CRDRepository } from '@project/util/util-types';
import { CommentEntity } from './comment.entity';
import { Comment, PostState } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from '@project/shared/shared-query';

@Injectable()
export class CommentRepository implements CRDRepository<CommentEntity, number, Comment> {
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
        commentId
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

  public async findByPostUser(postId: number, userId: string): Promise<Comment> {
    return this.prisma.comment.findFirst({
      where: {
        postId,
        userId
      }
    });


  }

  public async getIsPostStatusPublic(postId: number): Promise<boolean> {

    const post = await this.prisma.post.findFirst({
      where: {
        postId,
        postState: PostState.Public
      }
    });
    if (!post) {
      return false
    }
    return true
  }

}
