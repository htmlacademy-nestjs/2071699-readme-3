import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';
import { PostModule } from './posts/posts.module';
import { ConfigPostModule } from '@project/config/config-post';
import { UsersSubscriptionsModule } from './users-subscriptions/users-subscriptions.module';
import { NotifyDateModule } from './date-notify/date-notify.module';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    UsersSubscriptionsModule,
    ConfigUsersModule,
    ConfigPostModule,
    NotifyModule,
    NotifyDateModule,
    PostModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
