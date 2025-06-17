import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/services/prisma.service';
import { IUserRepository } from './user.repository.interface';
import { User, Prisma } from '../../../../generated/prisma';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email, deleted_at: null },
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id, deleted_at: null },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async findAll({ page = 1, limit = 10 }: PaginationDto): Promise<PaginatedResponseDto<User>> {
        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.user.count(),
        ]);

        return {
            data: users,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit),
            },
        };
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id, deleted_at: null },
            data,
        });
    }
}
