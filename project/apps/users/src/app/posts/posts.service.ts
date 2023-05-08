import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { PostForSend, RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class PostService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async getCountPosts(userId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'readme.posts',
      routingKey: RabbitRouting.GetCountPosts,
      payload: userId}
    );
  }

  public async geNewtPosts(dateNotify) : Promise<PostForSend[]> {
    return this.rabbitClient.request(
      {exchange: 'readme.posts',
      routingKey: RabbitRouting.GeNewtPosts,
      payload: dateNotify}
    );
  }
}
