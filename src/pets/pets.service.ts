import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { PetCreateDto } from './dto/pet-create.dto';
import { PetUpdateDto } from './dto/pet-update.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: PetCreateDto): Promise<Pet> {
    const user = await this.usersRepository.findOneBy({});

    const pet = this.petsRepository.create({ ...data, user });
    console.log(pet);
    return await this.petsRepository.save({ ...pet });
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  async findOne(petId: string): Promise<Pet> {
    return await this.petsRepository.findOne({ where: { id: petId } });
  }

  async update(petId: string, updatePetDto: PetUpdateDto) {
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
