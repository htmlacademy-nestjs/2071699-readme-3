import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { EditingModule } from './editing/editing.module';
import { ListPostsModule } from './list-posts/list-posts.module';
import { UserFeedModule } from './user-feed/user-feed.module';

@Module({
  imports: [BlogPostModule, EditingModule, ListPostsModule, UserFeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
