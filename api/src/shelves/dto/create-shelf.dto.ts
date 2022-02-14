import { IsString, MaxLength, MinLength } from 'class-validator';

const MIN_STRING_LENGTH = 3;
const MAX_STRING_LENGTH = 128;

export class CreateShelfDto {
  @IsString()
  @MinLength(MIN_STRING_LENGTH)
  @MaxLength(MAX_STRING_LENGTH)
  location: string;

  @IsString()
  @MaxLength(MAX_STRING_LENGTH)
  description: string;
}
