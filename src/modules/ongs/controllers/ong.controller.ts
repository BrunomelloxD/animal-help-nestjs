import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { OngService } from '../services/ong.service';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { Ong } from '../../../../generated/prisma'
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OngResponseDto } from '../dtos/response/ong-response.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CreateOngDto } from '../dtos/create-ong.dto';
import { GetUserId } from 'src/common/decorators/get-user-id.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetUserRole } from 'src/common/decorators/get-user-role.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('ongs')
export class OngController {
    constructor(private readonly ongService: OngService) { }

    @Get()
    findAll(@Query() queryParams: PaginationDto, @GetUserRole() role: Role): Promise<PaginatedResponseDto<Ong>> {
        return this.ongService.findAll(queryParams, role);
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('images', 5, {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        }),
        new TransformInterceptor(OngResponseDto),
    )
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
}
