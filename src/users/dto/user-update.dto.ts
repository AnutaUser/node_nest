import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { UserCreateDto } from './user-create.dto';

export class UserUpdateDto extends OmitType(UserCreateDto, [
  'email',
  'password',
]) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username: string;
}
