import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPostEntity } from './blog-post.entity';
import { Post, PostState, PostType } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './qurey/post.query';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject()

    const postNew = await this.prisma.post.create({
      data: {
        ...entityData,
        postType: String(entityData.postType),
        postState: String(entityData.postState),
        tags: {
          connect: entityData.tags
            .map(({ tagId }) => ({ tagId }))
        }
      },
      include: {
        tags: true,
      }
    });
    return {...postNew,
           postType: PostType[postNew.postType],
           postState: PostState[postNew.postState]
          }
  }


  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public async findById(postId: number): Promise<Post | null> {
    const post = await this.prisma.post.findFirst({
      where: {
        postId
      },
      include: {
        tags: true,
      }
    });
    return {...post,
      postType: PostType[post.postType],
      postState: PostState[post.postState]
     }
  }


  public async findByTitle(title: string): Promise<Post | null> {
    const post = await this.prisma.post.findFirst({
      where: {
        title
      },
      include: {
        tags: true,
      }
    });
    return {...post,
      postType: PostType[post.postType],
      postState: PostState[post.postState]
     }
  }

  public async find({limit, user, sortDirection, sortComments,  sortLikes, page}: PostQuery): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: user
      },
      take: limit,
      include: {
        tags: true
      },
      orderBy: [
        { createdAt: sortDirection,
          commentsCount: sortComments,
          likesCount: sortLikes}
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    const updPosts = posts.map((post) => ({
      ...post,
      postType: PostType[post.postType],
      postState: PostState[post.postState]
    }));

    return updPosts;

  }

  public async update(postId: number, item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject()
        const updPost = await this.prisma.post.update({
          where: {
            postId
          },
          data: {
            ...entityData,
            postType: String(entityData.postType),
            postState: String(entityData.postState),
            tags: {
              connect: entityData.tags
                .map(({ tagId }) => ({ tagId }))
            }
          },
          include: {
            tags: true,
          }
        })

        return {...updPost,
          postType: PostType[updPost.postType],
          postState: PostState[updPost.postState]
         }
    }
  }

