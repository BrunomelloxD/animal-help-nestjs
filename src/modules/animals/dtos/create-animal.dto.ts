import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @Type(() => Number)
    age: number;

    @IsString()
    species: string;

    @IsOptional()
    @IsString()
    breed?: string;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    adopted?: boolean;

    @IsInt()
    @Type(() => Number)
    ong_id: number;
}
