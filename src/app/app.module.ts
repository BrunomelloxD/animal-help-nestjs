import { Module } from '@nestjs/common';
import { OngModule } from 'src/modules/ongs/ong.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [OngModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
