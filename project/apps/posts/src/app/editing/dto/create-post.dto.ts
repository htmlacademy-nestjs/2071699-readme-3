import { ApiProperty } from "@nestjs/swagger";
import { PostState, PostType } from "@project/shared/shared-types";

export class CreatePostDto {
  @ApiProperty({
    description: 'Title post'
  })
  public title?: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Видео'
  })
  public video?: string;

  @ApiProperty({
    description: 'Список тегов к публикации'
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Анонс. Указывается для создания новой публикации типа Текст'
  })
  public preview?: string;

  @ApiProperty({
    description: 'Текст. Указывается для создания новой публикации типа Текст'
  })
  public text?: string;


  @ApiProperty({
    description: 'Текст цитаты. Указывается для создания новой публикации типа Цитата'
  })
  public quote?: string;

  @ApiProperty({
    description: 'Автор цитаты. Указывается для создания новой публикации типа Цитата'
  })
  public authQuote?: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Фото'
  })
  public photo?: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Ссылка'
  })
  public link?: string;

  @ApiProperty({
    description: 'Указывается для создания новой публикации типа Ссылка'
  })
  public descriptionLink?: string;

  @ApiProperty({
    description: 'Тип публикации'
  })
  public postType!: PostType;

  @ApiProperty({
    description: 'Статус публикации'
  })
  public postState!: PostState;

  @ApiProperty({
    description: 'ИД пользователя'
  })
  public userId: string;
}
