import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { ListPostsController } from './list-posts.controller';
import { ListPostsService } from './list-posts.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';

@Module({
  imports: [
   /* RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),*/
    BlogPostModule],
  controllers: [ListPostsController],
  providers: [ListPostsService]})
export class ListPostsModule {}
