import { ApiProperty } from "@nestjs/swagger";
import { PostType, Comment } from "@project/shared/shared-types";
import { TagValidateTitle } from "@project/shared/shared-validate";
import { ArrayMaxSize, MaxLength, MinLength, Validate } from "class-validator";
import { MAX_TAGS_COUNT, MAX_TAG_LENGTH, MIN_TAG_LENGTH } from "./dto.constant";

export class CreatePostDto {
  @ApiProperty({
    description: 'Title post'
  })
  public title?: string;

  @ApiProperty({
    description: 'Указывается основное содержимое публикации'
  })
  public content?: string;

  @ApiProperty({
    description: 'Список тегов к публикации'
  })
  @ArrayMaxSize(MAX_TAGS_COUNT)
  @MinLength(MIN_TAG_LENGTH, {each: true,})
  @MaxLength(MAX_TAG_LENGTH, {each: true,})
  @Validate(TagValidateTitle, {each: true,})
  public tags?: string[];

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
