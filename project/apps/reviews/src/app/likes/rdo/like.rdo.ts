import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The post ID'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Author comment'
  })
  @Expose()
  public userId: string;

}
