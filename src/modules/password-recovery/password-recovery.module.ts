import { Module } from "@nestjs/common";
import { PasswordRecoveryService } from "./services/password-recovery.service";
import { UserRepository } from "../users/repositories/user.repository";
import { PrismaService } from "src/config/prisma/services/prisma.service";
import { PasswordRecoveryRepository } from "./repositories/password-recovery.repository";
import { UserService } from "../users/services/user.service";

@Module({
    controllers: [],
    providers: [PasswordRecoveryRepository, PrismaService, PasswordRecoveryService, UserService, UserRepository],
    exports: []
})
export class PasswordRecoveryModule { }