import { Type } from 'class-transformer';

export class PaginationMetaDto {
    total: number;

    page: number;

    last_page: number;
}

export class PaginatedResponseDto<T> {
    @Type(() => Object)
    data: T[];

    meta: PaginationMetaDto;
}
