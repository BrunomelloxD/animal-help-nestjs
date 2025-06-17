import { Injectable } from "@nestjs/common";
import { IAdminRepository } from "./admin.repository.interface";
import { PrismaService } from "src/common/config/prisma/services/prisma.service";
import { User } from '../../../../generated/prisma';

@Injectable()
export class AdminRepository implements IAdminRepository {
    constructor(private readonly prisma: PrismaService) { }

    async restoreUser(id: string): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { deleted_at: null },
        });
    }
}