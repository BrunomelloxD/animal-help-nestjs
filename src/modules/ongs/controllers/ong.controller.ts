import { Controller, Get } from '@nestjs/common';
import { OngService } from '../services/ong.service';

@Controller('ongs')
export class OngController {
    constructor(private readonly ongService: OngService) { }

    @Get()
    getHello(): string {
        return this.ongService.getHello();
    }
}
