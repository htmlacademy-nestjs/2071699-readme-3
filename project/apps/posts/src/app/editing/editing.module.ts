import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { EditingController } from './editing.controller';
import { EditingService } from './editing.service';
import { BlogTagModule } from '../blog-tag/blog-tag.module';
import { BlogTagService } from '../blog-tag/blog-tag.service';
import { SubscribersModule } from '../subscribers/subscribers.module';

@Module({
  imports: [BlogPostModule, BlogTagModule, SubscribersModule],
  controllers: [EditingController],
  providers: [EditingService, BlogTagService]
})
export class EditingModule {}
