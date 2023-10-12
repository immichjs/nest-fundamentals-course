import { AuthService } from './auth.service';
import { AuthResetDto } from './dto/auth-reset.dto';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  public async signin(@Body() { email, password }: AuthSigninDto) {
    return this.authService.signin(email, password);
  }

  @Post('signup')
  public async signup(@Body() authSignupDto: AuthSignupDto) {
    return this.authService.signup(authSignupDto);
  }

  @Post('forget')
  public async forget(@Body() { email }: AuthForgetDto) {
    return this.authService.forget(email);
  }

  @Post('reset')
  public async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Request() request) {
    return { me: 'ok', data: request.tokenPayload };
  }
}
