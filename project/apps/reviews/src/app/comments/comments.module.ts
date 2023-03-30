import { Module } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentsService } from './comment.service';
import { CommentsController } from './comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentMemoryRepository]
})
export class CommentsModule {}
