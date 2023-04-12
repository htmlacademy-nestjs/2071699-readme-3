import { Module } from '@nestjs/common';
import { BlogPostMemoryRepository } from './blog-post-memory.repository';
import { BlogPostRepository } from './blog-post.repository';

@Module({
  providers: [BlogPostMemoryRepository, BlogPostRepository],
  exports: [BlogPostMemoryRepository, BlogPostRepository]
})
export class BlogPostModule {}
