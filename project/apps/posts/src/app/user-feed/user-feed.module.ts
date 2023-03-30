import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { UserFeedController } from './user-feed.controller';
import { UserFeedService } from './user-feed.service';

@Module({
  imports: [BlogPostModule],
  controllers: [UserFeedController],
  providers: [UserFeedService]
})
export class UserFeedModule {}
