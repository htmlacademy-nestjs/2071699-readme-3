import { Body, Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListPostsService } from './list-posts.service';
import { PostQuery } from '@project/shared/shared-query';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PostForSend, RabbitRouting } from '@project/shared/shared-types';
import { CountPostRdo } from './rdo/count-post.rdo';

@ApiTags('list-posts')
@Controller('posts')
export class ListPostsController {
  constructor(
    private readonly listPostsService: ListPostsService
  ) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Show list posts'
  })
  @Get('')
  public async showList(@Query() query: PostQuery) {
    const existPost = await this.listPostsService.getListPosts(query);
    return fillObject(PostRdo, existPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Show list draft posts by user'
  })
  @Get('/draft')
  public async showListDraft(@Body() body) {
    const existPost = await this.listPostsService.getListPostsDraft(body.userId);
    return fillObject(PostRdo, existPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post title found'
  })
  @Get('title/:title')
  public async showPostTitle(@Param('title') title: string) {
    const existPost = await this.listPostsService.getPostTitle(title);
    return fillObject(PostRdo, existPost);
  }


  @RabbitRPC({
    exchange: 'readme.posts',
    routingKey: RabbitRouting.GetCountPosts,
    queue: 'readme.posts.countposts',
  })
  public async getCountPostsUser(userId: string) {
    const countPosts = await this.listPostsService.getCountPostsUser(userId);
    return fillObject(CountPostRdo, countPosts);
  }

  @RabbitRPC({
    exchange: 'readme.posts',
    routingKey: RabbitRouting.GeNewtPosts,
    queue: 'readme.posts.newposts',
  })
  public async getNewPosts(dateNotify: Date) : Promise<PostForSend[]> {
    const listPosts = await this.listPostsService.getListPostsAfterDate(dateNotify);
    const listPostForSend = listPosts.map((el) => {
      return {title: el.title, content: el.content, addInfo: el.addInfo,
        postType: el.postType, userId: el.userId, createDate: el.createdAt} as PostForSend
    })
    return listPostForSend
  }
}

