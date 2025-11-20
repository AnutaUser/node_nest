import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PetTypeEnum } from '../enum/pet-type.enum';

export class PetBaseDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  petName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ required: true })
  @IsEnum(PetTypeEnum)
  @IsNotEmpty()
  type: PetTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  updatedAt: Date;
}
