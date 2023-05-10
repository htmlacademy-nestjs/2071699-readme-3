import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { CommentValidate } from "./dto.constant";

export class CommentDto {

  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(CommentValidate.MinCommentLength, {message: 'Minimum title length must be 10'})
  @MaxLength(CommentValidate.MaxCommentLength, {message: 'Maximum title length must be 300'})
  public message: string;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
