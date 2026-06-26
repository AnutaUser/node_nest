import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { PetCreateDto } from './dto/pet-create.dto';
import { PetUpdateDto } from './dto/pet-update.dto';
import { PetsService } from './pets.service';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // @UseGuards(AuthGuard())
  @Post(':userId')
  async create(@Body() petCreateDto: PetCreateDto) {
    return await this.petsService.create(petCreateDto);
  }

  @Get()
  async findAll() {
    return await this.petsService.findAll();
  }

  @Get(':petId')
  async findOne(@Param('petId') petId: string) {
    return await this.petsService.findOne(petId);
  }

  @UseGuards(AuthGuard())
  @Patch(':petId')
  async update(
    @Param('petId') petId: string,
    @Body() petUpdateDto: PetUpdateDto,
  ) {
    return await this.petsService.update(petId, petUpdateDto);
  }

  // @UseGuards(AuthGuard())
  @Delete(':petId')
  async remove(@Param('petId') petId: string) {
    return await this.petsService.remove(petId);
  }
}
