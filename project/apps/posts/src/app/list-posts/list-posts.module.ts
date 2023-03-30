import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { ListPostsController } from './list-posts.controller';
import { ListPostsService } from './list-posts.service';

@Module({
  imports: [BlogPostModule],
  controllers: [ListPostsController],
  providers: [ListPostsService]})
export class ListPostsModule {}
