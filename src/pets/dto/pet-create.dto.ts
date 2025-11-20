import { PickType } from '@nestjs/swagger';

import { PetBaseDto } from './pet-base.dto';

export class PetCreateDto extends PickType(PetBaseDto, [
  'petName',
  'age',
  'type',
  'image',
  'logo',
  'createdAt',
  'updatedAt',
]) {}
