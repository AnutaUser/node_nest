import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { UserGenderEnum } from '../../enums/user.gender.enum';
import { UserCreateDto } from './user-create.dto';

export class UserUpdateDto extends OmitType(UserCreateDto, [
  'email',
  'password',
]) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: false })
  @IsEnum(UserGenderEnum)
  @IsOptional()
  gender: string;
}
