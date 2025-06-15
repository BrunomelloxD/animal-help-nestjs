import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { AuthResponse, LoginCredentials } from '../types/auth.types';
import { User } from 'generated/prisma';
import { AUTH_ERRORS } from '../constants/auth.constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService
    ) { }

    async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
        const user = await this.validateCredentials(credentials);
        const accessToken = await this.tokenService.generateAccessToken(user);

        return {
            access_token: accessToken,
            user: this.excludeSensitiveData(user)
        };
    }

    private async validateCredentials(credentials: LoginCredentials): Promise<User> {
        const { email, password } = credentials;

        const user = await this.getUserByEmail(email);
        this.ensureUserIsActive(user);
        await this.validatePassword(password, user.password);

        return user;
    }

    private async getUserByEmail(email: string): Promise<User> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException(AUTH_ERRORS.USER_NOT_FOUND);
        }

        return user;
    }

    private async validatePassword(plainPassword: string, hashedPassword: string): Promise<void> {
        const isValid = await this.passwordService.compare(plainPassword, hashedPassword);

        if (!isValid) {
            throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
        }
    }

    private ensureUserIsActive(user: User): void {
        if (user.deleted_at !== null) {
            throw new UnauthorizedException(AUTH_ERRORS.ACCOUNT_DISABLED);
        }
    }

    private excludeSensitiveData(user: User) {
        const { password, deleted_at, ...safeUser } = user;
        return safeUser;
    }
}
