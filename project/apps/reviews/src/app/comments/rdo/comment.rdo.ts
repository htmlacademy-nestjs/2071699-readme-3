import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13'
  })
  @Expose({ name: 'commentId'})
  public id: string;

  @ApiProperty({
    description: 'The post ID'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Text comment'
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Author comment'
  })
  @Expose()
  public userId: string;

}
