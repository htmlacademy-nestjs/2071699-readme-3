import { ApiProperty } from "@nestjs/swagger";

export class LikeDto {
  @ApiProperty({
    description: 'The post ID'
  })
  public postId: number;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
