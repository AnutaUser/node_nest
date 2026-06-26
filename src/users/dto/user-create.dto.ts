import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { UserGenderEnum } from '../../enums/user.gender.enum';

export class Address {
  @ApiProperty({ required: false, example: '00-000' })
  @IsString()
  @IsOptional()
  kode?: string;

  @ApiProperty({ required: false, example: 'Paris' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false, example: 'Boulevard' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({ required: false, example: '503A' })
  @IsString()
  @IsOptional()
  number?: string;
}

export class UserCreateDto {
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

  @ApiProperty({ required: false })
  @IsEnum(UserGenderEnum)
  @IsOptional()
  gender: string;

  @ApiProperty({ required: true, example: 'user@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}:;,=]).{8,50}$/)
  password: string;

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
