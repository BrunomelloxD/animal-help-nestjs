import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class DeleteAnimalImagesDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', { each: true })
    image_ids: string[];
}
