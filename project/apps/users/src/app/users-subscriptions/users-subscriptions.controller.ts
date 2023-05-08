import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UserSubscriptionDto } from '@project/shared/shared-dto';
import { SubscriptionRdo } from './rdo/subscription.rdo';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Post as NewPost, PostForSend, RabbitRouting } from '@project/shared/shared-types';
import { NotifyService } from '../notify/notify.service';
import { BlogUserRepository } from '../blog-user/blog-user.repository';

@ApiTags('subscription')
@Controller('subscription')
export class UsersSubscriptionsController {
  constructor(
    private readonly usersSubscriptionsService: UsersSubscriptionsService,
    private readonly notifyService: NotifyService,
    private readonly blogUserRepository: BlogUserRepository,
  ) {}


  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: UserSubscriptionDto) {
    const newSubscription = await this.usersSubscriptionsService.create(dto);
    return fillObject(SubscriptionRdo, newSubscription);
  }

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.OK,
    description: 'Delete subscription'
  })
  @Delete('delete')
  public async delete(@Body() dto: UserSubscriptionDto) {
    const delSubscription = await this.usersSubscriptionsService.delete(dto);
    return fillObject(SubscriptionRdo, delSubscription);
  }

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.OK,
    description: 'Subscription by userId found'
  })
  @Get('user/:userId')
  public async getByUserId(@Param('userId') userId: string) {
    const subscriptions = await this.usersSubscriptionsService.getByUserId(userId);
    return fillObject(SubscriptionRdo, subscriptions);
  }

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.OK,
    description: 'Subscription by userId found'
  })
  @Get('usersubscription/:userSubscriptionId')
  public async getByUserSubscriptionId(@Param('userSubscriptionId') userSubscriptionId: string) {
    const subscriptions = await this.usersSubscriptionsService.getByUserSubscriptionId(userSubscriptionId);
    return fillObject(SubscriptionRdo, subscriptions);
  }

  @RabbitRPC({
    exchange: 'readme.posts',
    routingKey: RabbitRouting.PostForSuscribers,
    queue: 'readme.posts.suscribers',
  })
  public async postForSuscribers(@Body() post: NewPost) {

    const postForSend =  {title: post.title, content: post.content, addInfo: post.addInfo,
      postType: post.postType, userId: post.userId, createDate: post.createdAt} as PostForSend

    const subscriptions = await this.usersSubscriptionsService.getByUserSubscriptionId(post.userId);
    if (!subscriptions) {
        return null
       }

    const result =[];
    await Promise.all(subscriptions.map(async (subscription) => {

      const user = await this.blogUserRepository.findById(subscription.userId);

      const infoForSend = {
        userId: user._id,
        email: user.email,
        posts:[postForSend],
        dateSend: post.createdAt.toString()
      }
      await this.notifyService.notifyNewPosts(infoForSend)
      result.push(infoForSend)
       }));
    return result

  }
}

