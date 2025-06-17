import { Module } from '@nestjs/common';
import { OngController } from './controllers/ong.controller';
import { OngService } from './services/ong.service';
import { OngRepository } from './repositories/ong.repository';
import { PrismaService } from 'src/common/config/prisma/services/prisma.service';
import { OngImageRepository } from './repositories/ong-image.repository';

@Module({
  imports: [],
  controllers: [OngController],
  providers: [PrismaService, OngImageRepository, OngRepository, OngService],
  exports: [],
})
export class OngModule { }
