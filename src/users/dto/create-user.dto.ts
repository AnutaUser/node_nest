import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
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
import { Type } from 'class-transformer';

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

export class CreateUserDto {
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
}
