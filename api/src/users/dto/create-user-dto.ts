import { IsEmail, IsNotEmpty, MaxLength, Matches, IsNumber } from 'class-validator';

const MAX_STRING_LENGTH: number = 128;

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  readonly name: string;

  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_+(){}[\]:;.~<>|-]).{8,}$/)
  password: string;

  avatarPath: string;
  
  @MaxLength(MAX_STRING_LENGTH)
  readonly timeZone: string;

  notificationTime: number;
}
