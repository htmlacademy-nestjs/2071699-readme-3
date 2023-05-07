import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubscriptionRdo {
  @ApiProperty({
    description: 'The subscription ID'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The uniq user ID'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The uniq user subscription ID'
  })
  @Expose()
 public userSubscriptionId: string;


}
