import { BlogTagEntity } from './blog-tag.entity';
import { Tag } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogTagRepository implements CRUDRepository<BlogTagEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(tagId: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        tagId,
      }
    });
  }

  public findById(tagId: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        tagId
      }
    });
  }

  public findByTitle(tagName: string): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        title: tagName
      }
    });
  }

  public findByTitleArr(tagName: string[] =[]): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        title: {
          in: tagName.length > 0 ? tagName : undefined
        }
      }
    });
  }

  public find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        tagId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(tagId: number, item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: {
        tagId
      },
      data: { ...item.toObject(), tagId}
    });
  }
}
