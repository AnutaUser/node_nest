import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserSocialLoginDto {
  @ApiProperty({ required: true, example: 'user@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  accessToken: string;
}
