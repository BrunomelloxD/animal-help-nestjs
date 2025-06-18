import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Ong, Prisma } from "generated/prisma";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";
import { OngRepository } from "../repositories/ong.repository";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { CreateOngDto } from "../dtos/create-ong.dto";
import { OngImageRepository } from "../repositories/ong-image.repository";
import { server } from 'src/common/config/env.config';
import { Role } from "src/common/enums/role.enum";
import { UpdateOngDto } from "../dtos/update-ong.dto";
import { DeleteOngImagesDto } from "../dtos/delete-ong-images.dto";

@Injectable()
export class OngService {
    constructor(private readonly ongRepository: OngRepository, private readonly ongImageRepository: OngImageRepository) { }

    async deleteImages(dto: DeleteOngImagesDto): Promise<void> {
        await this.ongImageRepository.softDeleteMany(dto.image_ids);
    }

    async update(id: number, data: UpdateOngDto, files?: Express.Multer.File[]): Promise<Ong> {
        const updatedOng = await this.ongRepository.update(id.toString(), data);

        if (files && files.length > 0) {
            await this.saveImages(updatedOng.id, files);
        }

        return updatedOng;
    }

    async findOngByUserId(userId: string, queryParams: PaginationDto): Promise<PaginatedResponseDto<Ong>> {
        return await this.ongRepository.findOngByUserId(queryParams, userId);
    }

    async delete(id: string, userId: string, role: Role): Promise<void> {
        const ong = await this.ongRepository.findById(id);

        if (!ong) {
            throw new NotFoundException(`Ong with id ${id} not found`);
        }

        if (role !== Role.ADMIN && id !== userId) {
            throw new ForbiddenException('You can only delete your own ong');
        }

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
            await this.saveImages(ong.id, files);
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

    private async saveImages(ongId: number, files: Express.Multer.File[]): Promise<void> {
        if (!files?.length) return;

        const imageData = files.map((file) => ({
            ong_id: ongId,
            url: `${server.config.base_url}:${server.config.port}/uploads/${file.filename}`,
        }));

        const result = await this.ongImageRepository.create(imageData);
    }
}