import { Injectable } from '@nestjs/common';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
  ) {}

  async create(data: CreatePetDto): Promise<Pet> {
    console.log(data);
    return await this.petsRepository.save(data);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  async findOne(petId: string): Promise<Pet> {
    return await this.petsRepository.findOne({ where: { id: petId } });
  }

  async update(petId: string, updatePetDto: UpdatePetDto) {
    updatePetDto.updatedAt = new Date();

    const pet = await this.petsRepository.findOne({
      where: { id: petId },
    });
    await this.petsRepository.update(petId, updatePetDto);

    return { ...pet, ...updatePetDto };
  }

  async remove(petId: string): Promise<string> {
    await this.petsRepository.delete(petId);
    return `This action removes a #${petId} pet`;
  }
}
