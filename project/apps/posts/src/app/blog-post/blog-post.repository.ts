import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPostEntity } from './blog-post.entity';
import { Post, PostState, PostType } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery, DEFAULT_POST_COUNT_LIMIT_TITLE } from '@project/shared/shared-query';

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

    if (!post)
    {
       return null
    }
 return {...post,
  postType : PostType[post.postType],
  postState : PostState[post.postState]}
  }


  public async findByTitle(title: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        title: {
          contains: title
        },
        postState: PostState.Public
      },
      take: DEFAULT_POST_COUNT_LIMIT_TITLE,
      include: {
        tags: true,
      }
    });
    const updPosts = posts.map((post) => ({
      ...post,
      postType: PostType[post.postType],
      postState: PostState[post.postState]
    }));

    return updPosts;
  }

  public async findAll(query: PostQuery): Promise<Post[]> {
    const {limit, user, sortDirection, sortComments,  sortLikes, page, postType, tag}= query;
    const orderByState= [];

    const keys = Object.keys(query);

    keys.forEach(key => {
      key === 'sortDirection'? orderByState.push({createdAt: sortDirection}) : '';
      key === 'sortComments'? orderByState.push({comments: {_count: sortComments}}) : '';
      key === 'sortLikes'? orderByState.push({likes: {_count: sortLikes}}) : '';
    });

    const posts = await this.prisma.post.findMany({
      where: {
        userId: user,
        postState: PostState.Public,
        postType: postType,
        tags: {
          some: {
            title: {
              equals : tag
            }
          }
        }
      },
      take: limit,
      include: {
        tags: true,
        comments: true,
        likes: true
      },

      orderBy: orderByState,

      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    const updPosts = posts.map((post) => ({
      ...post,
      postType: PostType[post.postType],
      postState: PostState[post.postState]
    }));

    return updPosts;

  }


  public async findDraft(user: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: user,
        postState: PostState.Draft
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      },
    });
    const updPosts = posts.map((post) => ({
      ...post,
      postType: PostType[post.postType],
      postState: PostState[post.postState]
    }));
    return updPosts;
  }

  public async findUserId(user: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: user
      },
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


    public async findPostsAfterDate(date: Date): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
        where: {
          createdAt: {
            gt: date,
        }
        },
        include: {
          tags: true,
          comments: true,
          likes: true
        }
      });

      const updPosts = posts.map((post) => ({
        ...post,
        postType: PostType[post.postType],
        postState: PostState[post.postState]
      }));

      return updPosts;

    }


  }

