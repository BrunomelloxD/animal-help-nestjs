import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Prisma, Ong } from '../../../../generated/prisma'
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { Role } from 'src/common/enums/role.enum';

export abstract class IOngRepository {
    abstract create(data: Prisma.OngCreateInput): Promise<Ong>;
    abstract findById(id: string): Promise<Ong | null>;
    abstract findAll({ page, limit }: PaginationDto, role: Role): Promise<PaginatedResponseDto<Ong>>;
    abstract delete(id: string): Promise<void>;
    abstract findOngByUserId({ page, limit }: PaginationDto, userId: string): Promise<PaginatedResponseDto<Ong>>;
}