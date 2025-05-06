import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

export class PublicUserQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(['username', 'age', 'address', 'city', 'createdAt', 'updatedAt'])
  sort: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  order: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;
}
