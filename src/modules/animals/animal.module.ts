import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/config/prisma/services/prisma.service';
import { AnimalRepository } from './repositories/animal.repository';
import { AnimalService } from './services/animal.service';
import { AnimalController } from './controllers/animal.controller';
import { OngService } from '../ongs/services/ong.service';
import { OngRepository } from '../ongs/repositories/ong.repository';
import { OngImageRepository } from '../ongs/repositories/ong-image.repository';
import { AnimalImageRepository } from './repositories/animal-image.repository';

@Module({
  imports: [],
  controllers: [AnimalController],
  providers: [OngImageRepository, AnimalImageRepository, OngRepository, PrismaService, OngService, AnimalRepository, AnimalService],
  exports: [],
})
export class AnimalModule { }
