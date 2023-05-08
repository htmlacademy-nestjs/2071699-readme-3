import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSubscriptionsModel, UsersSubscriptionsSchema } from './users-subscriptions.model';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UsersSubscriptionsController } from './users-subscriptions.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { NotifyModule } from '../notify/notify.module';
import { BlogUserModule } from '../blog-user/blog-user.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UsersSubscriptionsModel.name, schema: UsersSubscriptionsSchema }
  ]),

  RabbitMQModule.forRootAsync(
    RabbitMQModule,
    getRabbitMQOptions('rabbit')
  ),
  NotifyModule,
  BlogUserModule],
  controllers: [UsersSubscriptionsController],
  providers: [UsersSubscriptionsService, UsersSubscriptionsRepository],
  exports: [UsersSubscriptionsService]
})
export class UsersSubscriptionsModule {}
