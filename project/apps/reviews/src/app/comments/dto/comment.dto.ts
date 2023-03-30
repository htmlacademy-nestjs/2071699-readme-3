import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
  @ApiProperty({
    description: 'The post ID'
  })
  public postId: string;

  @ApiProperty({
    description: 'Text comment'
  })
  public text: string;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
