import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { OngModule } from 'src/modules/ongs/ong.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [OngModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule { }
