import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyRecoveryCodeDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}