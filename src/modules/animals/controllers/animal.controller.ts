import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFiles } from "@nestjs/common";
import { AnimalService } from "../services/animal.service";
import { CreateAnimalDto } from "../dtos/create-animal.dto";
import { UploadImages } from "src/common/decorators/upload-images.decorator";
import { Animal } from "generated/prisma";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { GetUserRole } from "src/common/decorators/get-user-role.decorator";
import { Role } from "src/common/enums/role.enum";
import { UpdateAnimalDto } from "../dtos/update.animal.dto";
import { DeleteAnimalImagesDto } from "../dtos/delete-animal-images.dto";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AnimalDocs } from "../docs/animal.doc";

@ApiTags('Animals')
@Controller('animals')
export class AnimalController {
    constructor(private readonly animalService: AnimalService) { }

    @Delete('images')
    @ApiOperation({ summary: 'Delete images' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteImages(@Body() body: DeleteAnimalImagesDto): Promise<void> {
        return this.animalService.deleteImages(body);
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody(AnimalDocs)
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    @UploadImages()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateAnimalDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Animal> {
        return this.animalService.create(data, files)
    }

    @Get('ong/:id')
    @ApiQuery({ type: PaginationDto })
    @ApiParam({ name: 'id', type: String, description: 'ID da ONG' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    findAllByOngId(@Query() queryParams: PaginationDto, @Param('id') id: string, @GetUserRole() role: Role): Promise<PaginatedResponseDto<Animal>> {
        return this.animalService.findAllByOngId(id, queryParams, role);
    }

    @Get(':id')
    findById(@Param('id') id: string, @GetUserRole() role: Role): Promise<Animal> {
        return this.animalService.findById(id, role);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string): Promise<void> {
        return this.animalService.delete(id);
    }

    @Put(':id')
    @UploadImages()
    update(@Param('id') id: string, @Body() data: UpdateAnimalDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Animal> {
        return this.animalService.update(+id, data, files);
    }

}