import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { MailModule } from '../mail/mail.module';
import { NewPostsModel, NewPostsSchema } from './new-posts.model';
import { NewPostsService } from './new-posts.service';
import { NewPostsRepository } from './new-posts.repository';
import { NewPostsController } from './new-posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewPostsModel.name, schema: NewPostsSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  controllers: [NewPostsController],
  providers: [
    NewPostsService,
    NewPostsRepository,
    NewPostsController
  ],
})
export class NewPostsModule {}
