import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { MAX_PASS_LENGTH, MIN_PASS_LENGTH } from "./dto.constant";

export class PasswordDto {

  @ApiProperty({
    description: 'Current password'
  })
  public currentPassword: string;

  @ApiProperty({
    description: 'New password'
  })
  @MinLength(MIN_PASS_LENGTH, {message: 'Minimum title length must be 6'})
  @MaxLength(MAX_PASS_LENGTH, {message: 'Maximum title length must be 12'})
  public newPassword: string;

}
