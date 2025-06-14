import { Injectable } from "@nestjs/common";
import { Prisma, User } from '../../../../generated/prisma'
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { security } from '../../../config/env'
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<User>> {
        return this.userRepository.findAll(paginationDto);
    }

    create(data: Prisma.UserCreateInput): Promise<User> {
        const hashedPassword = bcrypt.hashSync(data.password, security.bcrypt.saltRounds);
        data.password = hashedPassword;

        return this.userRepository.create(data);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    delete(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.userRepository.update(id, data);
    }
}