import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { StaffModule } from '../staff/staff.module';
import { User } from '../users/entities/user.entity';
import { Pet } from './entities/pet.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => StaffModule),
    TypeOrmModule.forFeature([Pet, User]),
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
