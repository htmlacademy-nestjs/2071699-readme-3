import { Controller, Get, HttpStatus } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListPostsService } from './list-posts.service';

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
  public async showList() {
    const existPost = await this.listPostsService.getListPosts();
    return fillObject(PostRdo, existPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Show sort list posts'
  })
  @Get('sort')
  public async showListSort() {
    console.log('sort');
    const existPost = await this.listPostsService.getListPostsSort();
    return fillObject(PostRdo, existPost);
  }

}

