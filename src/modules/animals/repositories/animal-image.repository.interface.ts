import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Prisma, AnimalImage } from '../../../../generated/prisma'
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';

export abstract class IAnimalImageRepository {
    abstract create(data: Prisma.AnimalImageCreateInput): Promise<AnimalImage>;
    abstract softDeleteMany(ids: string[]): Promise<void>;
}