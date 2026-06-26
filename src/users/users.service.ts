import * as process from 'node:process';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { JWTPayload } from '../auth/interface/auth.interface';
import { PaginatedDto } from '../common/pagination/response';
import { PublicUserQueryDto } from '../core/query/users.query.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSocialLoginDto } from './dto/user-social-login.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';
import { PublicUserData } from './interface/user.interface';

@Injectable()
export class UsersService {
  private salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT);
  // private userForRes = 'users.*';
  private userForRes =
    'users.id, users.username, users.age, users.email,' +
    ' users.kode, users.city, users.street, users.number, ' +
    'users.avatar, users.status, users.gender, users.createdAt, users.updatedAt';

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findAllUsers(
    query: PublicUserQueryDto,
  ): Promise<PaginatedDto<PublicUserData>> {
    query.sort = query.sort || 'userId';
    query.order = query.order || 'ASC';

    const options = {
      page: query.page || 1,
      limit: query.limit || 5,
    };

    const queryBuilder = this.usersRepository
      .createQueryBuilder('users')
      .innerJoin('users.pets', 'pets')
      .select(this.userForRes);

    if (query.search) {
      queryBuilder.where('"username" IN(:...search)', {
        search: query.search.split(','),
      });
    }

    if (query.type) {
      queryBuilder.andWhere(
        `LOWER(pets.type) LIKE '%${query.type.toLowerCase()}%'`,
      );
    }

    queryBuilder.orderBy(`"${query.sort}"`, query.order as 'ASC' | 'DESC');

    const [pagination, rawResults] = await paginateRawAndEntities(
      queryBuilder,
      options,
    );
    console.log(rawResults.length);

    return {
      page: pagination.meta.currentPage,
      pages: pagination.meta.totalPages,
      countItem: pagination.meta.itemsPerPage,
      countTotal: pagination.meta.totalItems,
      entities: rawResults as [PublicUserData],
    };
  }

  async createUser(data: UserCreateDto) {
    const findUser = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    console.log(data);
    if (findUser) {
      throw new HttpException(
        'user with this em@il already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);

    const newUser = this.usersRepository.create(data);

    await this.usersRepository.save({ ...newUser });

    const token = await this.signIn({
      ...newUser,
      id: newUser.id,
    });

    return { token, newUser };
  }

  async findOne(userId: string): Promise<UserCreateDto> {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }

  async loginUser(data: UserLoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException(
        'email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!(await this.compareHash(data.password, user.password))) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.signIn(user);

    return { token };
  }

  async socialLoginUser(data: UserSocialLoginDto) {
    try {
      const oAuthClient = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
      );

      const result = await oAuthClient.verifyIdToken({
        idToken: data.accessToken,
      });

      const tokenPayload = result.getPayload();

      const token = await this.signIn({ id: tokenPayload.sub });

      return { token };
    } catch (e) {
      throw new HttpException('Google auth failed', HttpStatus.UNAUTHORIZED);
    }
  }

  async update(userId: string, userUpdateDto: UserUpdateDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      user.updatedAt = new Date();

      await this.usersRepository.update(user.id, {
        ...userUpdateDto,
        updatedAt: new Date().toISOString(),
      });

      return { ...user, ...userUpdateDto };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  async remove(userId: string) {
    try {
      await this.usersRepository.delete({ id: userId });

      return `This action removes a #${userId} user`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async signIn(user: JWTPayload) {
    return await this.authService.singIn({ ...user, id: user.id });
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
