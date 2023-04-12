import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { EditingController } from './editing.controller';
import { EditingService } from './editing.service';
import { BlogTagModule } from '../blog-tag/blog-tag.module';

@Module({
  imports: [BlogPostModule, BlogTagModule],
  controllers: [EditingController],
  providers: [EditingService]
})
export class EditingModule {}
