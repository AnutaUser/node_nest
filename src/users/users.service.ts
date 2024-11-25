import * as process from 'node:process';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JWTPayload } from '../auth/interface/auth.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(data: CreateUserDto) {
    const findUser = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (findUser) {
      throw new HttpException(
        'user with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);

    const newUser = this.usersRepository.create(data);

    await this.usersRepository.save(newUser);

    const token = await this.signIn({ ...newUser, id: newUser.id.toString() });

    return { token };
  }

  async getHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT);
    return await bcrypt.hash(password, salt);
  }

  async signIn(user: JWTPayload) {
    return await this.authService.singIn({ ...user, id: user.id });
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    // const findUser = users.find((user) => user.id === 7);

    // console.log(typeof findUser.address);
    return users;
  }

  async findOne(userId: string): Promise<CreateUserDto> {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    return { ...user, updateUserDto };
  }

  async remove(userId: string) {
    await this.usersRepository.delete({ id: userId });

    return `This action removes a #${userId} user`;
  }
}
