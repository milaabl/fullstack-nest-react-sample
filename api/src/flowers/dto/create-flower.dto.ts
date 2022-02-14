import { MaxLength, MinLength, IsNumber } from 'class-validator';

const MIN_STRING_LENGTH = 3;
const MAX_STRING_LENGTH = 128;

export class CreateFlowerDto {
  shelfId: string;

  @MinLength(MIN_STRING_LENGTH)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  description: string;

  hydrationRule: number;

  @IsNumber()
  wateringRule: number;

  nextWateringAt: Date;
}
