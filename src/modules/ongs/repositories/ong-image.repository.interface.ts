import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Prisma, OngImage } from '../../../../generated/prisma'
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';

export abstract class IOngImageRepository {
    abstract create(data: Prisma.OngImageCreateManyInput[]): Promise<Prisma.BatchPayload>;
    abstract softDeleteMany(ids: string[]): Promise<void>;
    // abstract delete(id: string): Promise<void>;
    // abstract findById(id: string): Promise<Ong | null>;
    // abstract findAll({ page, limit }: PaginationDto): Promise<PaginatedResponseDto<Ong>>;
}