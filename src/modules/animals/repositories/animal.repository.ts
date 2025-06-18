import { Injectable } from '@nestjs/common';
import { Animal, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/common/config/prisma/services/prisma.service';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { IAnimalRepository } from './animal.repository.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AnimalRepository implements IAnimalRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async update(id: number, data: Prisma.AnimalUpdateInput): Promise<Animal> {
        return this.prismaService.animal.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.animal.update({
            where: { id },
            data: { deleted_at: new Date() }
        })
    }

    async findById(id: number, role: Role): Promise<Animal | null> {
        const deletedFilter = role === Role.ADMIN ? {} : { deleted_at: null };

        return this.prismaService.animal.findUnique({
            where: { id, ...deletedFilter }, include: {
                animal_images: {
                    select: {
                        id: true,
                        url: true,
                        created_at: true
                    },
                    where: {
                        ...deletedFilter
                    }
                }
            }
        });
    }

    async findAllByOngId(
        id: number,
        { page = 1, limit = 10 }: PaginationDto,
        role: Role,
    ): Promise<PaginatedResponseDto<Animal>> {
        const deletedFilter = role === Role.ADMIN ? {} : { deleted_at: null };

        const [animals, total] = await this.prismaService.$transaction([
            this.prismaService.animal.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    ong_id: id,
                    ...deletedFilter,
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prismaService.animal.count({
                where: {
                    ong_id: id,
                    ...deletedFilter,
                },
            }),
        ]);

        return {
            data: animals,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit),
            },
        };
    }


    create(data: Prisma.AnimalCreateInput): Promise<Animal> {
        return this.prismaService.animal.create({
            data,
        });
    }
}