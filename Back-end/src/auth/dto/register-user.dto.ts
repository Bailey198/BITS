import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    status: number;
}