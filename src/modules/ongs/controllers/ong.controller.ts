import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UploadedFiles } from '@nestjs/common';
import { OngService } from '../services/ong.service';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { Ong } from '../../../../generated/prisma'
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateOngDto } from '../dtos/create-ong.dto';
import { GetUserId } from 'src/common/decorators/get-user-id.decorator';
import { GetUserRole } from 'src/common/decorators/get-user-role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateOngDto } from '../dtos/update-ong.dto';
import { UploadImages } from 'src/common/decorators/upload-images.decorator';
import { DeleteOngImagesDto } from '../dtos/delete-ong-images.dto';

@Controller('ongs')
export class OngController {
    constructor(private readonly ongService: OngService) { }

    @Delete('images')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteImages(@Body() body: DeleteOngImagesDto): Promise<void> {
        return this.ongService.deleteImages(body);
    }

    @Get()
    findAll(@Query() queryParams: PaginationDto, @GetUserRole() role: Role): Promise<PaginatedResponseDto<Ong>> {
        return this.ongService.findAll(queryParams, role);
    }

    @Post()
    @UploadImages()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() data: CreateOngDto,
        @GetUserId() userId: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.ongService.create(data, userId, files);
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<any> {
        return this.ongService.findById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string, @GetUserId() userId: string, @GetUserRole() role: Role): Promise<void> {
        return this.ongService.delete(id, userId, role);
    }

    @Put(':id')
    @UploadImages()
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateOngDto,
        @UploadedFiles() files?: Express.Multer.File[],
    ): Promise<Ong> {
        return this.ongService.update(id, data, files);
    }

    @Get('user/:id')
    async findOngByUserId(@Param('id') id: string, @Query() queryParams: PaginationDto): Promise<PaginatedResponseDto<Ong>> {
        return this.ongService.findOngByUserId(id, queryParams);
    }
}
