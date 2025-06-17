import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsLatitude,
    IsLongitude,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateOngDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsLatitude()
    @Type(() => Number)
    latitude?: number;

    @IsOptional()
    @IsLongitude()
    @Type(() => Number)
    longitude?: number;

    @IsOptional()
    @IsString()
    about?: string;

    @IsOptional()
    @IsString()
    instructions?: string;

    @IsOptional()
    @IsString()
    opening_hours?: string;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    open_on_weekends?: boolean;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    id_active?: boolean;
}
