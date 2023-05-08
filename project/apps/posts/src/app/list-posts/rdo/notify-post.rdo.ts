import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';

export class NotifyPostRdo {

  @ApiProperty({
    description: 'Title post'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Видео'
  })
  @Expose()
  public content: string;

  @ApiProperty({
    description: 'Указывается дополнительная информация к публикации, например автор цитаты, описание ссылки и т.д.'
  })
  @Expose()
  public addInfo?: string;

  @ApiProperty({
    description: 'Тип публикации'
  })
  @Expose()
  public postType: PostType;

  @ApiProperty({
    description: 'User registration date',
  })
  @Expose()
  public createdAt: Date;
}
