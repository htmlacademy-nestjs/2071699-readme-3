import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';


@ApiTags('likes')
@Controller('like')
export class LikesController {
  constructor(
    private readonly likesService: LikesService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new like has been successfully created.'
  })
  @Post('create/:id')
  public async create(@Param('id') id: number, @Body() body) {
    const newLike = await this.likesService.createLike(id, body.userId);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    description: 'Delete like'
  })
  @Delete('delete/:id')
  public async delete(@Param('id') id: number, @Body() body) {
    await this.likesService.delete(id, body.userId);
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    description: 'Like by postId found'
  })
  @Get(':postId')
  public async showPostId(@Param('postId') postId: number) {
    const likes = await this.likesService.getPostId(postId);
    return fillObject(LikeRdo, likes);
  }

}

