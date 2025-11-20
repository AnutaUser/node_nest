import { PickType } from '@nestjs/swagger';

import { PetBaseDto } from './pet-base.dto';

export class PetUpdateDto extends PickType(PetBaseDto, [
  'petName',
  'age',
  'image',
  'logo',
  'updatedAt',
]) {}
