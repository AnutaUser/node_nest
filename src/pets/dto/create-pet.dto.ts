import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  petName: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  type: string;

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
  createdAt;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  updatedAt;
}
