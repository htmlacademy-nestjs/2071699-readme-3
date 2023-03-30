import { ApiProperty } from "@nestjs/swagger";

export class LikeDto {
  @ApiProperty({
    description: 'The post ID'
  })
  public postId: string;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
