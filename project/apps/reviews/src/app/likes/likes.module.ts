import { Module } from '@nestjs/common';
import { LikeMemoryRepository } from './like-memory.repository';
import { LikesController } from './like.controller';
import { LikesService } from './like.service';
import { LikeRepository } from './like.repository';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikeMemoryRepository, LikeRepository]})
export class LikesModule {}
