import { Module } from '@nestjs/common';
import { LikeMemoryRepository } from './like-memory.repository';
import { LikesController } from './like.controller';
import { LikesService } from './like.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikeMemoryRepository]})
export class LikesModule {}
