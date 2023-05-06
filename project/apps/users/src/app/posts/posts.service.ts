import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class PostService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async getCountPosts(userId: string) {
    console.log('getCountPosts')
    const countPosts = await this.rabbitClient.publish<string>(
      'readme.posts',
      RabbitRouting.GetPosts,
      userId
    )
    console.log(countPosts)

    return this.rabbitClient.publish<string>(
      'readme.posts',
      RabbitRouting.GetPosts,
      userId
    );
  }
}
