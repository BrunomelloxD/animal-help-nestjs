import { Injectable } from "@nestjs/common";
import { IOngImageRepository } from "./ong-image.repository.interface";
import { OngImage, Prisma } from "generated/prisma";
import { PrismaService } from "src/common/config/prisma/services/prisma.service";


@Injectable()
export class OngImageRepository implements IOngImageRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.OngImageCreateManyInput[]): Promise<Prisma.BatchPayload> {
        const result = await this.prisma.ongImage.createMany({
            data
        });
        return result;
    }

    async softDeleteMany(ids: string[]): Promise<void> {
        await this.prisma.ongImage.updateMany({
            where: {
                id: { in: ids },
                deleted_at: null,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }
}