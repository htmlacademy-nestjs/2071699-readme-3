import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './qurey/comment.query';


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
  @Post('create')
  public async create(@Body() dto: CommentDto) {
    const newComment = await this.commentsService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Delete comment'
  })
  @Delete('delete/:id')
  public async delete(@Param('id') id: number) {
    await this.commentsService.delete(id);
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

