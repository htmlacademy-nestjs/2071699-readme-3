import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-post';
import { ConfigType } from '@nestjs/config';
import {  Post, RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class SubscribersService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async postSuscribers(post: Post) {
    return this.rabbitClient.request<Post>(
      {exchange: 'readme.posts',
      routingKey: RabbitRouting.PostForSuscribers,
      payload: post}
    );
  }


}
