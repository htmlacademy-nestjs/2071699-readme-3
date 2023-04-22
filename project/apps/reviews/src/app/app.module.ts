import { Module } from '@nestjs/common';

import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [LikesModule, CommentsModule, PrismaModule]
})
export class AppModule {}
