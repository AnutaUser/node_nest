import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
]) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username: string;
}
