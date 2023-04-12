import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPostEntity } from './blog-post.entity';
import { Post, PostState, PostType } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
    const entityData =  {...item.toObject(),
      postType: item.toObject().postType.toString(),
         postState:item.toObject().postState.toString(),
         isRepost: item.toObject().isRepost.toString()}

    const postNew = await this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        tags: {
          connect: entityData.tags
            .map(({ tagId }) => ({ tagId }))
        }
      },
      include: {
        comments: true,
        tags: true,
      }
    });
    return {...postNew,
           postType: PostType[postNew.postType],
           postState: PostState[postNew.postState],
           isRepost: postNew.isRepost === 'true'? true :false
          }
  }


}
