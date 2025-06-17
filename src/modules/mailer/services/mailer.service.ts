import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { security } from '../../../common/config/env.config'

@Injectable()
export class MailerService {
    private transporter = nodemailer.createTransport({
        host: security.mailer.host,
        port: security.mailer.port,
        secure: false,
        auth: {
            user: security.mailer.mail,
            pass: security.mailer.pass,
        },
    });

    async sendRecoveryCode(to: string, code: string): Promise<void> {
        await this.transporter.sendMail({
            from: `"Animal Help" <${security.mailer.mail}>`,
            to,
            subject: 'Recuperação de senha',
            text: `Seu código de recuperação é: ${code}`,
            html: `<p>Seu código de recuperação é: <strong>${code}</strong></p>`,
        });
    }
}
