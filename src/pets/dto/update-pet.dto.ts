import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({ required: false })
  @IsString()
  petName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type: string;
}
