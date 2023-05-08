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

  async findAndCreateTag(tagsName: string[]): Promise<Tag[]> {

 await Promise.all(tagsName.map(async (tag) => {

 const existsTag = await this.blogTagRepository.findByTitle(tag);

   if (!existsTag) {
      const tagEntity = new BlogTagEntity({title: tag});
      await this.blogTagRepository.create(tagEntity);
    }
  }));

      return this.blogTagRepository.findByTitleArr(tagsName);
  }

}
