import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  ValidateNested,
} from 'class-validator';

import { Address } from '../../users/dto/user-create.dto';

export class StaffBaseDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}:;,=]).{8,50}$/)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  position: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  degree: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  address: Address;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  updatedAt: Date;
}
