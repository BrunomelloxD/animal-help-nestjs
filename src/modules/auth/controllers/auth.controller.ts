
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserService } from 'src/modules/users/services/user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RecoveryPasswordDto } from '../dtos/recovery-password.dto';
import { VerifyRecoveryCodeDto } from '../dtos/verify-recovery-code.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { PasswordRecoveryService } from 'src/modules/password-recovery/services/password-recovery.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private passwordRecoveryService: PasswordRecoveryService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() data: LoginUserDto) {
    return this.authService.signIn(data);
  }

  @Public()
  @Post('recover-password/request')
  recoverPassword(@Body() data: RecoveryPasswordDto) {
    return this.passwordRecoveryService.recoverPassword(data.email);
  }

  @Public()
  @Post('recover-password/verify')
  async verifyRecoveryCode(@Body() data: VerifyRecoveryCodeDto) {
    return this.passwordRecoveryService.verifyRecoveryCode(data);
  }

  @Public()
  @Post('recover-password/reset')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.passwordRecoveryService.resetPassword(data);
  }
}
