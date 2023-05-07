import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UserSubscriptionDto } from '@project/shared/shared-dto';
import { SubscriptionRdo } from './rdo/subscription.rdo';


@ApiTags('subscription')
@Controller('subscription')
export class UsersSubscriptionsController {
  constructor(
    private readonly usersSubscriptionsService: UsersSubscriptionsService
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
}

