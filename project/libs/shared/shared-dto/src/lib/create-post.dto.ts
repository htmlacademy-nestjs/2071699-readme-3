import { ApiProperty } from "@nestjs/swagger";
import { PostType, Comment } from "@project/shared/shared-types";

export class CreatePostDto {
  @ApiProperty({
    description: 'Title post'
  })
  public title?: string;

  @ApiProperty({
    description: 'Указывается основное содержимое публикации'
  })
  public content: string;

  @ApiProperty({
    description: 'Список тегов к публикации'
  })
  public tags?: number[];

  @ApiProperty({
    description: 'Указывается дополнительная информация к публикации, например автор цитаты, описание ссылки и т.д.'
  })
  public addInfo?: string;

  @ApiProperty({
    description: 'Тип публикации'
  })
  public postType!: PostType;


  @ApiProperty({
    description: 'Список комментариев к публикации'
  })
  public comments?: Comment[];

  @ApiProperty({
    description: 'Признак «Репост»'
  })
  public isRepost: boolean;

  @ApiProperty({
    description: 'ИД пользователя'
  })
  public userId: string;
}
