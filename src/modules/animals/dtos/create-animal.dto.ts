import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnimalDto {
    @ApiProperty({ description: 'Nome do animal', example: 'Rex' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Descrição do animal', example: 'Cachorro amigável e brincalhão' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Idade do animal em anos', example: 3 })
    @IsInt()
    @Type(() => Number)
    age: number;

    @ApiProperty({ description: 'Espécie do animal', example: 'Cachorro' })
    @IsString()
    species: string;

    @ApiPropertyOptional({ description: 'Raça do animal', example: 'Labrador' })
    @IsOptional()
    @IsString()
    breed?: string;

    @ApiPropertyOptional({ description: 'Se o animal foi adotado', example: false })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    adopted?: boolean;

    @ApiProperty({ description: 'ID da ONG à qual o animal pertence', example: 1 })
    @IsInt()
    @Type(() => Number)
    ong_id: number;
}
