import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [PrismaService, UserRepository, UserService],
    exports: [UserRepository],
})
export class UserModule { }
