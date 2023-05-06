import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';
import { PostModule } from './posts/posts.module';
import { ConfigPostModule } from '@project/config/config-post';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigUsersModule,
    ConfigPostModule,
    NotifyModule,
    PostModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
