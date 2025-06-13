import { Body, Controller, Get, HttpCode, Post, HttpStatus, Param, UseInterceptors, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../../../generated/prisma'
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

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
    create(@Body() data: CreateUserDto) {
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
}
