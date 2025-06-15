import { User } from '../../../../generated/prisma'

export abstract class IAdminRepository {
    abstract restoreUser(userId: string): Promise<void>;
}