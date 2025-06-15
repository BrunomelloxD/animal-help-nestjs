import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RecoveryPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}