import { Module } from '@nestjs/common';
import { UserService } from '../users/services/user.service';
import { UserRepository } from '../users/repositories/user.repository';
import { PrismaService } from 'src/config/prisma/services/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { security } from 'src/config/env';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';

@Module({
    imports: [
        JwtModule.register({
            secret: security.jwt.secret,
            signOptions: { expiresIn: security.jwt.expiresIn },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PasswordService, TokenService, UserService, PrismaService, UserRepository],
    exports: [],
})
export class AuthModule { }
