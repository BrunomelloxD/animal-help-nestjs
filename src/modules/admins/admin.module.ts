import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { PrismaService } from "src/config/prisma/services/prisma.service";
import { AdminService } from "./services/admin.service";
import { AdminRepository } from "./repositories/admin.repository";

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [PrismaService, AdminRepository, AdminService],
    exports: [AdminRepository],
})
export class AdminModule { }