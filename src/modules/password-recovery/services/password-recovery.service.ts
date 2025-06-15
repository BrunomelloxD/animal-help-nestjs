import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { security } from '../../../config/env'
import { MailerService } from "src/modules/mailer/services/mailer.service";
import { PasswordRecoveryRepository } from "../repositories/password-recovery.repository";
import { UserService } from "src/modules/users/services/user.service";

@Injectable()
export class PasswordRecoveryService {
    constructor(private readonly passwordRecoveryRepository: PasswordRecoveryRepository, private readonly mailerService: MailerService, private readonly userService: UserService) { }

    async recoverPassword(email: string): Promise<void> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await this.passwordRecoveryRepository.recoverPassword(code, expiresAt, user.id);

        await this.mailerService.sendRecoveryCode(user.email, code);
    }

    async verifyRecoveryCode(email: string, code: string): Promise<void> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const codeData = await this.passwordRecoveryRepository.findByRecoveryCode(code, user.id);

        if (!codeData) {
            throw new NotFoundException(`Recovery code ${code} not found`);
        }
    }

    async resetPassword(data: { email: string, password: string }) {
        const user = await this.userService.findByEmail(data.email);

        if (!user) {
            throw new NotFoundException(`User with email ${data.email} not found`);
        }

        const hashedPassword = bcrypt.hashSync(data.password, security.bcrypt.saltRounds);
        await this.userService.update(user.id, { password: hashedPassword });

        await this.passwordRecoveryRepository.delete(user.id);
    }
}