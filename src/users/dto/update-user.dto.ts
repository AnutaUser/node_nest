import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
  'createdAt',
]) {
  @ApiProperty({ required: false })
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city: string;
}
