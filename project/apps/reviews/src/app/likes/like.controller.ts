import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
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
  @Post('create')
  public async create(@Body() dto: LikeDto) {
    const newLike = await this.likesService.createLike(dto);
    return fillObject(LikeRdo, newLike);
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    description: 'Delete like'
  })
  @Delete('delete')
  public async delete(@Body() dto: LikeDto) {
    await this.likesService.delete(dto.postId, dto.userId);
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

