import { Injectable } from "@nestjs/common";
import { Ong, Prisma } from "generated/prisma";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";
import { OngRepository } from "../repositories/ong.repository";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { CreateOngDto } from "../dtos/create-ong.dto";
import { OngImageRepository } from "../repositories/ong-image.repository";
import { server } from 'src/config/env';
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class OngService {
    constructor(private readonly ongRepository: OngRepository, private readonly ongImageRepository: OngImageRepository) { }

    async delete(id: string): Promise<void> {
        return await this.ongRepository.delete(id);
    }

    async findById(id: string): Promise<any> {
        return await this.ongRepository.findById(id);
    }

    findAll(paginationDto: PaginationDto, role: Role): Promise<PaginatedResponseDto<Ong>> {
        return this.ongRepository.findAll(paginationDto, role);
    }

    async create(data: CreateOngDto, userId: string, files: Express.Multer.File[]): Promise<Ong> {
        const ongData = this.mapDtoToPrismaInput(data, userId);
        const ong = await this.ongRepository.create(ongData);

        if (files && files.length > 0) {
            const imageData = files.map((file) => ({
                ong_id: ong.id,
                url: `${server.config.base_url}:${server.config.port}/uploads/${file.filename}`,
            }));

            await this.ongImageRepository.create(imageData);
        }

        return ong;
    }

    /**
     * Converte o DTO da API para o formato esperado pelo Prisma
     * Transforma user_id em relacionamento user.connect
     */
    private mapDtoToPrismaInput(dto: CreateOngDto, userId: string): Prisma.OngCreateInput {
        return {
            name: dto.name,
            latitude: dto.latitude,
            longitude: dto.longitude,
            about: dto.about,
            instructions: dto.instructions,
            opening_hours: dto.opening_hours,
            open_on_weekends: dto.open_on_weekends,
            id_active: dto.id_active,
            user: {
                connect: { id: userId }
            }
        };
    }
}