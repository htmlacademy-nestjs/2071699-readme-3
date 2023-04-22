import { Module } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentsService } from './comment.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comment.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentMemoryRepository, CommentRepository]
})
export class CommentsModule {}
