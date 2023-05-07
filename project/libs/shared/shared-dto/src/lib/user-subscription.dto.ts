import { ApiProperty } from "@nestjs/swagger";

export class UserSubscriptionDto {

  @ApiProperty({
    description: 'User ID'
  })
  public userId: string;

  @ApiProperty({
    description: 'Subscription user ID'
  })
  public userSubscriptionId: string;
}
