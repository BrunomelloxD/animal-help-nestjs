import { Injectable } from "@nestjs/common";


@Injectable()
export class OngService {
    getHello(): string {
        return 'teste';
    }
}