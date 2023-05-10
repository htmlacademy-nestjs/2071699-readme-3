import { Injectable } from '@nestjs/common';
import { CRDRepository } from '@project/util/util-types';
import { LikeEntity } from './like.entity';
import { Like, PostState } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeRepository implements CRDRepository<LikeEntity, number, Like> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: LikeEntity): Promise<Like> {
    const entityData = item.toObject()

    const likeNew = await this.prisma.like.create({
      data: {
        ...entityData
    }});
    return likeNew
  }


  public async destroy(likeId: number): Promise<void> {
    await this.prisma.like.delete({
      where: {
        likeId,
      }
    });
  }

  public async findById(postId: number): Promise<Like | null> {
    return this.prisma.like.findFirst({
      where: {
        postId: postId
      },
      include: {
        post: true,
      }
    });
  }


  public async findByPostId(postId: number): Promise<Like[]> {
    return this.prisma.like.findMany({
      where: {
        postId: postId
      },
      include: {
        post: true
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

  public async findByPostUser(postId: number, userId: string): Promise<Like | null> {

    return this.prisma.like.findFirst({
      where: {
        postId,
        userId
      },
      include: {
        post: true
      }
    });
  }


}
