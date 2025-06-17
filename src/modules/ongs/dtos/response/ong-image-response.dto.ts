import { Expose } from "class-transformer";

export class OngImageDto {
    @Expose()
    id: string;

    @Expose()
    url: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
}