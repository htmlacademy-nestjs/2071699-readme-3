import { BlogTagService } from './blog-tag.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TagRdo } from './rdo/tag.rdo';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTag = await this.blogTagService.getTag(id);
    return fillObject(TagRdo, existTag);
  }

  @Get('/')
  async index() {
    const tags = await this.blogTagService.getCategories();
    return fillObject(TagRdo, tags);
  }

  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const newTag = await this.blogTagService.createTag(dto);
    return fillObject(TagRdo, newTag);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogTagService.deleteTag(id);
  }

}
