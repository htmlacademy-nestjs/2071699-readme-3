import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { PassValidate } from "./dto.constant";

export class PasswordDto {

  @ApiProperty({
    description: 'Current password'
  })
  public currentPassword: string;

  @ApiProperty({
    description: 'New password'
  })
  @MinLength(PassValidate.MinPassLength, {message: 'Minimum title length must be 6'})
  @MaxLength(PassValidate.MaxPassLength, {message: 'Maximum title length must be 12'})
  public newPassword: string;

}
