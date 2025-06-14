import { Controller, HttpCode, HttpStatus, NotFoundException, Param, Patch, Query } from "@nestjs/common";
import { AdminService } from "../services/admin.service";
import { UserService } from "src/modules/users/services/user.service";

@Controller('admins')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Patch('restore/:id/user')
    @HttpCode(HttpStatus.NO_CONTENT)
    restoreUser(@Param() param: Record<'id', string>): Promise<void> {

        return this.adminService.restoreUser(param.id);
    }
}