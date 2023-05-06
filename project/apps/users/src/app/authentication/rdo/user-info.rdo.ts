import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class UserInfoRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'User registration date',
  })
  public createdAt: string;

  @ApiProperty({
    description: 'Count posts',
  })
  @Expose()
  public countPosts: string;

}
