import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteAnimalImagesDto {
    @ApiProperty({
        description: 'Array contendo os IDs das imagens a serem deletadas',
        type: [String],
        example: [
            '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            'd9b1d7db-8e24-47e4-a3bf-cb5d6f1f5432',
        ],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', { each: true })
    image_ids: string[];
}
