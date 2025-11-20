import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/pagination/response';
import { PublicUserQueryDto } from '../core/query/users.query.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { PublicUserData } from './interface/user.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiExtraModels(PublicUserData, PaginatedDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiPaginatedResponse('entities', PublicUserData)
  @Get()
  async findAll(
    @Query()
    query: PublicUserQueryDto,
  ) {
    return await this.usersService.findAllUsers(query);
  }

  @UseGuards(AuthGuard())
  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.usersService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.usersService.update(userId, userUpdateDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    return await this.usersService.remove(userId);
  }
}
