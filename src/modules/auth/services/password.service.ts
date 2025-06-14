import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { security } from '../../../config/env';

@Injectable()
export class PasswordService {
    async hash(password: string): Promise<string> {
        return hash(password, security.bcrypt.saltRounds);
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return compare(plainPassword, hashedPassword);
    }
}