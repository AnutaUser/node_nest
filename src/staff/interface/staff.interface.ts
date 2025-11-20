import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class PublicStaffData {
  @ApiProperty()
  staffId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Max(130)
  @Min(18)
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
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  logo: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsBoolean()
  position: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  degree: boolean;

  @ApiProperty({ required: false, default: new Date() })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ required: false, default: new Date() })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
