import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiTags('Pets')
  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':petId')
  findOne(@Param('petId') petId: string) {
    return this.petsService.findOne(petId);
  }

  @Patch(':petId')
  update(@Param('petId') petId: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(petId, updatePetDto);
  }

  @Delete(':petId')
  remove(@Param('petId') petId: string) {
    return this.petsService.remove(petId);
  }
}
