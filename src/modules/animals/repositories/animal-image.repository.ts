import { Injectable } from "@nestjs/common";
import { IAnimalImageRepository } from "./animal-image.repository.interface";
import { PrismaService } from "src/common/config/prisma/services/prisma.service";
import { Prisma, AnimalImage } from "generated/prisma";


@Injectable()
export class AnimalImageRepository implements IAnimalImageRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async softDeleteMany(ids: string[]): Promise<void> {
        await this.prismaService.animalImage.updateMany({
            where: {
                id: { in: ids },
                deleted_at: null,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }

    async create(data: Prisma.AnimalImageCreateInput): Promise<AnimalImage> {
        return this.prismaService.animalImage.create({
            data,
        });
    }
}