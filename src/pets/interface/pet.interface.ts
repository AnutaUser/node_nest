import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { JoinColumn, ManyToMany } from 'typeorm';

import { Staff } from '../../staff/entities/staff.entity';

export class PublicPetData {
  @ApiProperty()
  userId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  petName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Max(130)
  @Min(18)
  age: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  logo: string;

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

  // @ApiProperty()
  // @OneToOne(() => User, (entity) => entity.pets)
  // @IsObject()
  // user: User;

  @ApiProperty()
  @ManyToMany(() => Staff, (entity) => entity.pets)
  @JoinColumn()
  staff: Staff[];
}
