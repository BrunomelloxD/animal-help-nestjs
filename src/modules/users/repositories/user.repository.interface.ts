import { Prisma, User } from '../../../../generated/prisma'

export abstract class IUserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract create(data: Prisma.UserCreateInput): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract findAll(): Promise<User[]>;
}