import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { EditingModule } from './editing/editing.module';

@Module({
  imports: [BlogPostModule, EditingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
