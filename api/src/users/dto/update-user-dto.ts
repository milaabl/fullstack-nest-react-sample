import {IsEmail, IsOptional, MaxLength, Min, Max} from 'class-validator';

const MAX_STRING_LENGTH: number = 128;

export class UpdateUserDto {
  @IsOptional()
  @MaxLength(MAX_STRING_LENGTH)
  readonly name: string;

  @IsOptional()
  @MaxLength(MAX_STRING_LENGTH)
  readonly lastName: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @Min(0)
  @Max(1439) // 24h * 60min - 1
  notificationTime: number
}
