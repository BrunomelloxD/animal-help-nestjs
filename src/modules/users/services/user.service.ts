import { Injectable } from "@nestjs/common";
import { Prisma, User } from '../../../../generated/prisma'
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { security } from '../../../config/env'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }
    getHello(): string {
        return 'user service';
    }

    findAll() {
        return this.userRepository.findAll();
    }

    create(data: Prisma.UserCreateInput): Promise<User> {
        const hashedPassword = bcrypt.hashSync(data.password, security.bcrypt.saltRounds);
        data.password = hashedPassword;

        return this.userRepository.create(data);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }
}