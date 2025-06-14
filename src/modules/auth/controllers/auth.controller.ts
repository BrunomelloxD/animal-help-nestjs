
import { Body, Controller, Post, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserService } from 'src/modules/users/services/user.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() data: LoginUserDto) {
    return this.authService.signIn(data);
  }
}
