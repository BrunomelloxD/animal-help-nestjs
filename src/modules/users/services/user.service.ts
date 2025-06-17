import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma, User } from '../../../../generated/prisma'
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { security } from '../../../common/config/env.config'
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<User>> {
        return this.userRepository.findAll(paginationDto);
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        if (await this.findByEmail(data.email)) {
            throw new ConflictException(`User with email ${data.email} already exists`);
        }

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

    // findOngByUserId(id: string, userId: string, role: Role): Promise<User | null> {
    //     return this.userRepository.findOngByUserId(id, userId, role);
    // }
}