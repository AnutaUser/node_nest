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

import { PublicUserQueryDto } from '../core/query/users.query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUserData } from './interface/user.interface';
import { ApiPaginatedResponse, PaginatedDto } from './pagination/response';
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
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId);
  }
}
