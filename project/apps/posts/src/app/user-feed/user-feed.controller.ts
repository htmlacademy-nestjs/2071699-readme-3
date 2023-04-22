import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserFeedService } from './user-feed.service';
import { PostQuery } from '../blog-post/qurey/post.query';

@ApiTags('user-feed')
@Controller('feed')
export class UserFeedController {
  constructor(
    private readonly userFeedService: UserFeedService
  ) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Show user feed'
  })
  @Get('')
  public async showFeed(@Query() query: PostQuery) {
    const existPost = await this.userFeedService.getUserFeed(query);
    return fillObject(PostRdo, existPost);
  }


}

