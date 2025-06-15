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
import { PasswordRecoveryModule } from 'src/modules/password-recovery/password-recovery.module';

@Module({
  imports: [OngModule, UserModule, AuthModule, AdminModule, EmailModule, PasswordRecoveryModule],
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
