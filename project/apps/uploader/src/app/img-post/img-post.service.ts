import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-post';
import { ConfigType } from '@nestjs/config';
import {  RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class ImgPostService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async postImgPost(postId:string, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'readme.uploader',
      routingKey: RabbitRouting.PostImg,
      payload: {postId, fileId}}
    );
  }


}
