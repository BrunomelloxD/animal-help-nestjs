import { Injectable } from "@nestjs/common";
import { IOngRepository } from "./ong.repository.interface";
import { PrismaService } from "src/common/config/prisma/services/prisma.service";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Ong, Prisma } from "generated/prisma";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class OngRepository implements IOngRepository {
    constructor(private readonly prisma: PrismaService) { }

    async update(id: string, data: Prisma.OngUpdateInput): Promise<Ong> {
        const ID = +id;
        return this.prisma.ong.update({
            where: { id: ID },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        const ID = +id;
        await this.prisma.ong.update({
            where: { id: ID },
            data: { deleted_at: new Date() },
        })
    }

    async findById(id: string): Promise<Ong | null> {
        const ID = +id;
        return this.prisma.ong.findUnique({
            where: { id: ID },
            include: {
                images: {
                    select: {
                        id: true,
                        url: true,
                        created_at: true
                    }
                }
            },
        });
    }

    async findAll({ page = 1, limit = 10 }: PaginationDto, role: Role): Promise<PaginatedResponseDto<Ong>> {
        const where: Prisma.OngWhereInput = role === Role.ADMIN ? {} : { deleted_at: null };

        const [ongs, total] = await this.prisma.$transaction([
            this.prisma.ong.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where,
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.ong.count({ where }),
        ]);

        return {
            data: ongs,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit),
            },
        };
    }

    async create(data: Prisma.OngCreateInput): Promise<Ong> {
        return this.prisma.ong.create({
            data,
        });
    }
}