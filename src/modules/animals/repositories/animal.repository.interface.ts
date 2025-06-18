import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Prisma, Animal } from '../../../../generated/prisma'
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { Role } from 'src/common/enums/role.enum';

export abstract class IAnimalRepository {
    abstract create(data: Prisma.AnimalCreateInput): Promise<Animal>;
    abstract findAllByOngId(id: number, { page, limit }: PaginationDto, role: Role): Promise<PaginatedResponseDto<Animal>>
    abstract findById(id: number, role: Role): Promise<Animal | null>
    abstract delete(id: number): Promise<void>
    abstract update(id: number, data: Prisma.AnimalUpdateInput): Promise<Animal>
}