import { ApiProperty } from '@nestjs/swagger';

export class CountPostRdo {
  @ApiProperty({
    description: 'Count posts'
  })
  public countPosts: number;



}
