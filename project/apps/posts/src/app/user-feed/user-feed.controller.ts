import { Controller, Get, HttpStatus } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserFeedService } from './user-feed.service';

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
  public async showFeed() {
    const existPost = await this.userFeedService.getUserFeed();
    return fillObject(PostRdo, existPost);
  }


}

