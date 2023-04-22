import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListPostsService } from './list-posts.service';
import { PostQuery } from '../blog-post/qurey/post.query';

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


}

