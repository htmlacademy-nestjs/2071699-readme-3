import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { LikeEntity } from './like.entity';
import { Like } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeRepository implements CRUDRepository<LikeEntity, number, Like> {
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

  public async findByPostUser(postId: number, userId: string): Promise<Like> {
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


  public update(_id: number, _item: LikeEntity): Promise<Like> {
    return Promise.resolve(undefined);
  }
}
