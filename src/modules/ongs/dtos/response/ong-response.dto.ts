import { Expose, Type } from 'class-transformer';
import { OngImageDto } from './ong-image-response.dto'

export class OngResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    latitude: number;

    @Expose()
    longitude: number;

    @Expose()
    about: string;

    @Expose()
    instructions: string;

    @Expose()
    opening_hours: string;

    @Expose()
    open_on_weekends: boolean;

    @Expose()
    id_active: boolean;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;

    @Expose()
    user_id: string;

    @Expose()
    @Type(() => OngImageDto)
    images: OngImageDto[];
}
