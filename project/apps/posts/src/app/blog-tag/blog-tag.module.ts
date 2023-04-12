import { BlogTagController } from './blog-tag.controller';
import { BlogTagService } from './blog-tag.service';
import { BlogTagRepository } from './blog-tag.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BlogTagController],
  providers: [BlogTagService, BlogTagRepository],
  exports: [BlogTagRepository]
})
export class BlogTagModule {}
