import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditingService } from './editing.service';
import { RepostRdo } from './rdo/repost.rdo';
import { PostValidationPipe } from '@project/shared/shared-pipes';
import { contentEditValidationSchema, contentValidationSchema } from '@project/shared/shared-joi';
import { CreatePostDto, EditPostDto } from '@project/shared/shared-dto';
import { SubscribersService } from '../subscribers/subscribers.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/shared-types';

@ApiTags('editing')
@Controller('post')
export class EditingController {
  constructor(
    private readonly editService: EditingService,
    private readonly subscribersService: SubscribersService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create')
  @UsePipes(new PostValidationPipe(contentValidationSchema))
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.editService.createPost(dto);
    await this.subscribersService.postSuscribers(newPost)
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
    description: 'Edit post'
  })
  @Patch('edit/:id')
  @UsePipes(new PostValidationPipe(contentEditValidationSchema))
  public async edit(@Param('id') id: number, @Body() dto: EditPostDto) {

    const existPost = await this.editService.updatePostId(id, dto);
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
  public async repost(@Param('id') id: number, @Body() body) {
    const existPost = await this.editService.repost(id, body.newUserId);
    return fillObject(RepostRdo, existPost);
  }

  @RabbitRPC({
    exchange: 'readme.uploader',
    routingKey: RabbitRouting.PostImg,
    queue: 'readme.uploader.posts',
  })
  public async postImage({postId, fileId}) {
    console.log('postImage')
    const postUpd = await this.editService.changeImg(postId, fileId)
    console.log('postUpd', postUpd)
    return fillObject(PostRdo, postUpd);
  }

}

