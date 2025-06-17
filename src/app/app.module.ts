import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { OngModule } from 'src/modules/ongs/ong.module';
import { UserModule } from 'src/modules/users/user.module';
import { AdminModule } from 'src/modules/admins/admin.module';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { EmailModule } from 'src/modules/mailer/mailer.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { server } from 'src/common/config/env.config';

@Module({
  imports: [OngModule, UserModule, AuthModule, AdminModule, EmailModule,
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'ong',
          type: 'direct',
        },
      ],
      uri: server.rabbitqm.url,
      connectionInitOptions: { wait: false }
    }),
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
