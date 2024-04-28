import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  private pets: any = [];

  async create(createPetDto: CreatePetDto): Promise<CreatePetDto> {
    const newPet = { petId: uuidv4(), ...createPetDto };
    return await this.pets.push(newPet);
  }

  async findAll(): Promise<CreatePetDto[]> {
    return await this.pets;
  }

  async findOne(petId: string): Promise<CreatePetDto> {
    return await this.pets.find((pet) => pet.petId === petId);
  }

  async update(
    petId: string,
    updatePetDto: UpdatePetDto,
  ): Promise<UpdatePetDto> {
    const index = await this.pets.findIndex((pet) => pet.petId === petId);
    this.pets[index] = { ...this.pets[index], ...updatePetDto };
    return this.pets[index];
  }

  async remove(petId: string): Promise<string> {
    const index = await this.pets.findIndex((pet) => pet.petId === petId);
    await this.pets.splice(index, 1);
    return `This action removes a #${petId} pet`;
  }
}
