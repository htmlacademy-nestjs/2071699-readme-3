import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from "./dto.constant";

export class CommentDto {

  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(MIN_COMMENT_LENGTH, {message: 'Minimum title length must be 10'})
  @MaxLength(MAX_COMMENT_LENGTH, {message: 'Maximum title length must be 300'})
  public message: string;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
