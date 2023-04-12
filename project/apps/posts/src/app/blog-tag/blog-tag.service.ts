import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from '@project/shared/shared-types';
import { BlogTagRepository } from './blog-tag.repository';
import { Injectable } from '@nestjs/common';
import { BlogTagEntity } from './blog-tag.entity';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const tagEntity = new BlogTagEntity(dto);
    return this.blogTagRepository.create(tagEntity);
  }

  async deleteTag(id: number): Promise<void> {
    this.blogTagRepository.destroy(id);
  }

  async getTag(id: number): Promise<Tag> {
    return this.blogTagRepository.findById(id);
  }

  async getCategories(): Promise<Tag[]> {
    return this.blogTagRepository.find();
  }
}
