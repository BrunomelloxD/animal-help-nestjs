import { Body, Controller, Get, HttpCode, Post, HttpStatus, Param, UseInterceptors, NotFoundException, Delete, ConflictException, Put, Query, ForbiddenException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../../../generated/prisma'
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { PaginationTransformInterceptor } from 'src/common/interceptors/pagination-transforme.interceptor';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Role } from 'src/common/enums/role.enum';
import { GetUserRole } from 'src/common/decorators/get-user-role.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { GetUserId } from 'src/common/decorators/get-user-id.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles(Role.ADMIN)
    @UseInterceptors(new PaginationTransformInterceptor(UserResponseDto))
    findAll(@Query() queryParams: PaginationDto): Promise<PaginatedResponseDto<User>> {
        return this.userService.findAll(queryParams);
    }

    @Post()
    @UseInterceptors(new TransformInterceptor(UserResponseDto))
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUserDto) {
        if (await this.userService.findByEmail(data.email)) {
            throw new ConflictException(`User with email ${data.email} already exists`);
        }

        return this.userService.create(data);
    }

    @Get(':id')
    @UseInterceptors(new TransformInterceptor(UserResponseDto))
    async findById(@Param() param: Record<'id', string>, @GetUserRole() role: Role, @GetUserId() userId: string): Promise<User | null> {
        if (role !== Role.ADMIN && param.id !== userId) {
            throw new ForbiddenException('You can only access your own user data.');
        }

        const user = await this.userService.findById(param.id);

        if (!user) {
            throw new NotFoundException(`User with id ${param.id} not found`);
        }

        return user;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param() param: Record<'id', string>): Promise<void> {
        return this.userService.delete(param.id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param() param: Record<'id', string>, @Body() data: UpdateUserDto, @GetUserRole() role: Role, @GetUserId() userId: string): Promise<User> {
        if (role !== Role.ADMIN && param.id !== userId) {
            throw new ForbiddenException('You can only update your own user data.');
        }

        const user = await this.userService.findById(param.id);
        if (!user) {
            throw new NotFoundException(`User with id ${param.id} not found`);
        }

        const userByEmail = await this.userService.findByEmail(data.email);
        if (userByEmail && userByEmail.id !== param.id) {
            throw new ConflictException(`User with email ${data.email} already exists`);
        }

        return this.userService.update(param.id, data);
    }
}
