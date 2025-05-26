import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Address } from '../dto/create-user.dto';

export class PublicUserData {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Max(130)
  @Min(18)
  age: number;

  @ApiProperty({ required: true, example: 'user@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  address: Address;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false, default: new Date() })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ required: false, default: new Date() })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
