import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "generated/prisma";

export class UpdateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    avatar_url?: string;

    @IsEnum(UserRole)
    role: UserRole;
}