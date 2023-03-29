import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { EditingController } from './editing.controller';
import { EditingService } from './editing.service';

@Module({
  imports: [BlogPostModule],
  controllers: [EditingController],
  providers: [EditingService]
})
export class EditingModule {}
