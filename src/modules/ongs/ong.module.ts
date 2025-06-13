import { Module } from '@nestjs/common';
import { OngController } from './controllers/ong.controller';
import { OngService } from './services/ong.service';

@Module({
  imports: [],
  controllers: [OngController],
  providers: [OngService],
  exports: [],
})
export class OngModule { }
