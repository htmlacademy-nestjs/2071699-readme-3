import { Module } from '@nestjs/common';
import { BlogPostMemoryRepository } from './blog-post-memory.repository';

@Module({
  providers: [BlogPostMemoryRepository],
  exports: [BlogPostMemoryRepository]
})
export class BlogPostModule {}
