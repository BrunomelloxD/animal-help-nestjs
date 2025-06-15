import { Injectable } from '@nestjs/common';
import { MailerService } from '../services/mailer.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MailerConsumer {
    constructor(private readonly mailer: MailerService) { }

    @RabbitSubscribe({
        exchange: 'email-exchange',
        routingKey: 'email.recovery',
        queue: 'email-recovery-queue',
    })
    async handleRecoveryEmail(msg: { to: string; code: string }) {
        await this.mailer.sendRecoveryCode(msg.to, msg.code);
    }
}
