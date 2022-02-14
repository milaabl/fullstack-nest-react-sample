import { IsNotEmpty, Matches } from 'class-validator';

export class ResetPasswordDto {
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_+(){}[\]:;.~<>|-]).{8,}$/)
    password: string;

    @IsNotEmpty()
    token: string;
}