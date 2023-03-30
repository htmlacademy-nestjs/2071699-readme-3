import { Module } from '@nestjs/common';

import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [LikesModule, CommentsModule]
})
export class AppModule {}
