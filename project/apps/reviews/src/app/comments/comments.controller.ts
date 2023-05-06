import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentDto } from '@project/shared/shared-dto';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from '@project/shared/shared-query';


@ApiTags('comments')
@Controller('comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create/:postId')
  public async create(@Param('postId') postId: number, @Body() dto: CommentDto) {
    const newComment = await this.commentsService.createComment(postId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Delete comment'
  })
  @Delete('delete/:postId')
  public async delete(@Param('postId') postId: number, @Body() body) {
    await this.commentsService.delete(postId, body.userId);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment by postId found'
  })
  @Get(':postId')
  public async showPostId(@Query() query: CommentQuery, @Param('postId') postId: number) {
    const comments = await this.commentsService.getPostId(query, postId);
    return fillObject(CommentRdo, comments);
  }

}

