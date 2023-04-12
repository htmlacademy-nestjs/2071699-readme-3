import { Entity } from '@project/util/util-types';
import { Tag } from '@project/shared/shared-types';

export class BlogTagEntity implements Entity<BlogTagEntity>, Tag {
  public id: number;
  public title: string;

  constructor(category: Tag) {
    this.fillEntity(category);
  }

  public fillEntity(entity: Tag) {
    this.title = entity.title;
    this.id = entity.tagId;
  }

  public toObject(): BlogTagEntity {
    return { ...this }
  }
}
