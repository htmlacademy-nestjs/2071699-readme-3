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
  public content: string;

  @ApiProperty({
    description: 'Указывается дополнительная информация к публикации, например автор цитаты, описание ссылки и т.д.'
  })
  @Expose()
  public addInfo?: string;

  @ApiProperty({
    description: 'Количество комментариев'
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Количество лайков'
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'Список тегов к публикации'
  })
  @Expose()
  public tags: string[];

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

  @ApiProperty({
    description: 'ИД оригинальной публикации'
  })
  @Expose()
  public originPostId: string;

}
