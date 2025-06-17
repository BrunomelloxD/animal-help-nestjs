import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateOngDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsLatitude()
    @Type(() => Number)
    latitude: number;

    @IsLongitude()
    @Type(() => Number)
    longitude: number;

    @IsString()
    @IsNotEmpty()
    about: string;

    @IsString()
    @IsNotEmpty()
    instructions: string;

    @IsString()
    @IsNotEmpty()
    opening_hours: string;

    @IsBoolean()
    @Type(() => Boolean)
    open_on_weekends: boolean;

    @IsBoolean()
    @Type(() => Boolean)
    id_active: boolean;

    @IsOptional()
    images?: Express.Multer.File[];
}
