import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest().headers;
    const { authorization } = request;

    try {
      const data = this.authService.verifyToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      return true;
    } catch (e) {}
    return;
  }
}
