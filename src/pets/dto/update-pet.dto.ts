import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({ required: false })
  @IsString()
  petName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  updatedAt;
}
