import * as process from 'node:process';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { JWTPayload } from '../auth/interface/auth.interface';
import { PublicUserQueryDto } from '../core/query/users.query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PublicUserData } from './interface/user.interface';
import { PaginatedDto } from './pagination/response';

@Injectable()
export class UsersService {
  // userForResponse = ['username', 'age', 'users_addressCity', 'addressStreet'];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findAllUsers(
    query: PublicUserQueryDto,
  ): Promise<PaginatedDto<PublicUserData>> {
    query.sort = query.sort || 'id';
    query.order = query.order || 'ASC';
    const options = {
      page: query.page || 1,
      limit: query.limit || 3,
    };

    const queryBuilder = this.usersRepository
      .createQueryBuilder('users')
      .select('users.*');

    if (query.search) {
      queryBuilder.where('"username", IN(:...search)', {
        search: query.search.split(','),
      });
    }

    queryBuilder.orderBy(`"${query.sort}"`, query.order as 'ASC' | 'DESC');

    const [pagination, rawResults] = await paginateRawAndEntities(
      queryBuilder,
      options,
    );

    return {
      page: pagination.meta.currentPage,
      pages: pagination.meta.totalPages,
      countItem: pagination.meta.itemsPerPage,
      countTotal: pagination.meta.totalItems,
      entities: rawResults as [PublicUserData],
    };
  }

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

  async findOne(userId: string): Promise<CreateUserDto> {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    user.updatedAt = new Date();

    await this.usersRepository.update(user.id, updateUserDto);

    return { ...user, ...updateUserDto };
  }

  async remove(userId: string) {
    await this.usersRepository.delete({ id: userId });

    return `This action removes a #${userId} user`;
  }
}
