import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditingService } from './editing.service';
import { RepostRdo } from './rdo/repost.rdo';
import { PostValidationPipe } from '@project/shared/shared-pipes';
import { contentValidationSchema } from '@project/shared/shared-joi';

type NewUserId = {
  userId: string;
  };



@ApiTags('editing')
@Controller('post')
export class EditingController {
  constructor(
    private readonly editService: EditingService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create')
  @UsePipes(new PostValidationPipe(contentValidationSchema))
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.editService.createPost(dto);
    return fillObject(PostRdo, newPost);
  }


  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post id found'
  })
  @Get(':id')
  public async showPostId(@Param('id') id: number) {
    const existPost = await this.editService.getPostId(id);
    return fillObject(PostRdo, existPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post title found'
  })
  @Get('title/:title')
  public async showPostTitle(@Param('title') title: string) {
    const existPost = await this.editService.getPostTitle(title);
    return fillObject(PostRdo, existPost);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Edit post'
  })
  @Patch('edit/:id')
  public async edit(@Param('id') id: number, @Body() dto: CreatePostDto) {
    const existPost = await this.editService.updatePostId(id, dto);
    console.log(existPost);
    return fillObject(PostRdo, existPost);
  }


  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Delete post'
  })
  @Delete('delete/:id')
  public async delete(@Param('id') id: number) {
    await this.editService.deletePostId(id);
  }


  @ApiResponse({

    type: RepostRdo,
    status: HttpStatus.OK,
    description: 'Repost'
  })
  @Post('repost/:id')
  public async repost(@Param('id') id: number, @Body() newUserId: NewUserId) {
    const existPost = await this.editService.repost(id, newUserId.userId);
    return fillObject(RepostRdo, existPost);
  }
}

