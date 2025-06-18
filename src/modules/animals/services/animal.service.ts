import { Injectable, NotFoundException } from '@nestjs/common';
import { AnimalRepository } from '../repositories/animal.repository';
import { Animal, Prisma } from 'generated/prisma';
import { CreateAnimalDto } from '../dtos/create-animal.dto';
import { OngService } from 'src/modules/ongs/services/ong.service';
import { server } from 'src/common/config/env.config';
import { AnimalImageRepository } from '../repositories/animal-image.repository';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Role } from 'src/common/enums/role.enum';
import { DeleteAnimalImagesDto } from '../dtos/delete-animal-images.dto';

@Injectable()
export class AnimalService {
    constructor(private readonly animalRepository: AnimalRepository, private readonly animalImageRepository: AnimalImageRepository, private readonly ongService: OngService) { }

    async deleteImages(dto: DeleteAnimalImagesDto): Promise<void> {
        await this.animalImageRepository.softDeleteMany(dto.image_ids);
    }

    async update(id: number, data: Prisma.AnimalUpdateInput, files?: Express.Multer.File[]): Promise<Animal> {
        const animal = await this.animalRepository.update(id, data);

        if (files && files.length > 0) {
            await this.saveImages(animal.id, files);
        }

        return animal;
    }

    async delete(id: string): Promise<void> {
        await this.animalRepository.delete(+id);
    }

    async findById(id: string, role: Role): Promise<Animal> {
        const animal = await this.animalRepository.findById(+id, role);

        if (!animal) {
            throw new NotFoundException(`Animal with id ${id} not found`);
        }

        return animal;
    }

    async findAllByOngId(id: string, queryParams: PaginationDto, role: Role): Promise<PaginatedResponseDto<Animal>> {
        const ong = await this.ongService.findById(id);

        if (!ong) {
            throw new NotFoundException(`Ong with id ${id} not found`);
        }

        const ong_id = +id;

        return this.animalRepository.findAllByOngId(ong_id, queryParams, role);
    }

    async create(data: CreateAnimalDto, files: Express.Multer.File[]): Promise<Animal> {
        const ong = await this.ongService.findById(data.ong_id.toString());

        if (!ong) {
            throw new NotFoundException(`Ong with id ${data.ong_id} not found`);
        }

        const animalData: Prisma.AnimalCreateInput = {
            name: data.name,
            description: data.description,
            age: data.age,
            species: data.species,
            breed: data.breed,
            adopted: data.adopted ?? false,
            ong: {
                connect: {
                    id: data.ong_id,
                },
            }
        };

        const animal = await this.animalRepository.create(animalData);

        if (files && files.length > 0) {
            await this.saveImages(animal.id, files);
        }

        return animal;
    }

    private async saveImages(animalId: number, files: Express.Multer.File[]): Promise<void> {
        if (!files?.length) return;

        for (const file of files) {
            const imageData = {
                animal: {
                    connect: {
                        id: animalId,
                    },
                },
                url: `${server.config.base_url}:${server.config.port}/uploads/${file.filename}`,
            };

            await this.animalImageRepository.create(imageData);
        }
    }
}
