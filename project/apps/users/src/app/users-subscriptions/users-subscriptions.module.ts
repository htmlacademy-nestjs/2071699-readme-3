import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSubscriptionsModel, UsersSubscriptionsSchema } from './users-subscriptions.model';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UsersSubscriptionsController } from './users-subscriptions.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UsersSubscriptionsModel.name, schema: UsersSubscriptionsSchema }
  ])],
  controllers: [UsersSubscriptionsController],
  providers: [UsersSubscriptionsService, UsersSubscriptionsRepository]
})
export class UsersSubscriptionsModule {}
