import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Prisma, User } from '../../../../generated/prisma'

export abstract class IUserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract create(data: Prisma.UserCreateInput): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract findAll({ page, limit }: PaginationDto);
}