import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { PostController } from './post.controller';
import { PostsController } from './posts.controller';
import { LikesController } from './likes.controller';
import { CommentsController } from './comments.controller';
import { UploaderController } from './uploader.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    PostController,
    PostsController,
    LikesController,
    CommentsController,
    UploaderController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
