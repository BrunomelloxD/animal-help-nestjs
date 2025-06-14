import { Body, Controller, Get, HttpCode, Post, HttpStatus, Param, UseInterceptors, NotFoundException, Delete, ConflictException, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../../../generated/prisma'
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Role } from 'src/common/enums/role.enum';

@Controller('users')
@UseInterceptors(new TransformInterceptor(UserResponseDto))
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUserDto) {
        if (await this.userService.findByEmail(data.email)) {
            throw new ConflictException(`User with email ${data.email} already exists`);
        }

        return this.userService.create(data);
    }

    @Get(':id')
    async findById(@Param() param: Record<'id', string>): Promise<User | null> {
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
    async update(@Param() param: Record<'id', string>, @Body() data: UpdateUserDto): Promise<User> {
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
