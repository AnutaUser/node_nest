import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: any = [];

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const newUser = { userId: uuidv4(), ...createUserDto };
    await this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<CreateUserDto[]> {
    return await this.users;
  }

  async findOne(userId: string): Promise<CreateUserDto> {
    return await this.users.find((user) => user.userId === userId);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const index = await this.users.findIndex((user) => user.userId === userId);
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  async remove(userId: string) {
    const index = await this.users.findIndex((user) => user.userId === userId);
    await this.users.splice(index, 1);
    return `This action removes a #${userId} user`;
  }
}
