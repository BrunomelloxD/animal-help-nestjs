import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/services/prisma.service';
import { IUserRepository } from './user.repository.interface';
import { User, Prisma } from '../../../../generated/prisma';

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

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { deleted_at: null },
            orderBy: { created_at: 'desc' },
        });
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
