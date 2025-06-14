import { Injectable } from "@nestjs/common";
import { AdminRepository } from "../repositories/admin.repository";
import { User } from '../../../../generated/prisma';

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository: AdminRepository) { }

    restoreUser(id: string): Promise<void> {
        return this.adminRepository.restoreUser(id);
    }
}