import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
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

@Controller('ongs')
export class OngController {
    constructor(private readonly ongService: OngService) { }

    @Get()
    findAll(@Query() queryParams: PaginationDto, @GetUserRole() role: Role): Promise<PaginatedResponseDto<Ong>> {
        return this.ongService.findAll(queryParams, role);
    }

    @Post()
    @UploadImages()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() data: CreateOngDto,
        @GetUserId() userId: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.ongService.create(data, userId, files);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<any> {
        return await this.ongService.findById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        return await this.ongService.delete(id);
    }

    @Put(':id')
    @UploadImages()
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateOngDto,
        @UploadedFiles() files?: Express.Multer.File[],
    ): Promise<Ong> {
        return this.ongService.update(id, data, files);
    }
}
