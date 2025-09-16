import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiTags('Pets')
  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @ApiTags('Pets')
  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @ApiTags('Pets')
  @Get(':petId')
  findOne(@Param('petId') petId: string) {
    return this.petsService.findOne(petId);
  }

  @ApiTags('Pets')
  @Patch(':petId')
  update(@Param('petId') petId: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(petId, updatePetDto);
  }

  @ApiTags('Pets')
  @Delete(':petId')
  remove(@Param('petId') petId: string) {
    return this.petsService.remove(petId);
  }
}
