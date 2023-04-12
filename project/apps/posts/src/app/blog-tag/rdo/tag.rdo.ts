import { Expose } from 'class-transformer';

export class TagRdo {
  @Expose()
  public tagId: string;

  @Expose()
  public title: string;
}
