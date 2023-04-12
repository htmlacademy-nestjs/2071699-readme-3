import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';

export class RepostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: '13'
  })
  @Expose({ name: 'postId'})
  public id: string;

  @ApiProperty({
    description: 'Title post'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Видео'
  })
  @Expose()
  public video: string;

  @ApiProperty({
    description: 'Список тегов к публикации'
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Анонс. Указывается для создания новой публикации типа Текст'
  })
  @Expose()
  public preview: string;

  @ApiProperty({
    description: 'Текст. Указывается для создания новой публикации типа Текст'
  })
  @Expose()
  public text: string;


  @ApiProperty({
    description: 'Текст цитаты. Указывается для создания новой публикации типа Цитата'
  })
  @Expose()
  public quote: string;

  @ApiProperty({
    description: 'Автор цитаты. Указывается для создания новой публикации типа Цитата'
  })
  @Expose()
  public authQuote: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Фото'
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Ссылка'
  })
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Ссылка'
  })
  public descriptionLink: string;

  @ApiProperty({
    description: 'Тип публикации'
  })
  @Expose()
  public postType: PostType;

  @ApiProperty({
    description: 'Статус публикации'
  })
  @Expose()
  public postState!: PostState;

  @ApiProperty({
    description: 'ИД пользователя'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'ИД оригинального автора'
  })
  @Expose()
  public originUserId: string;

}
