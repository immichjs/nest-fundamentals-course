import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  private issuer = 'signin';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  public createToken({ id, name, email }: User) {
    const accessToken = this.jwtService.sign(
      {
        sub: id,
        name: name,
        email: email,
      },
      {
        expiresIn: '3d',
        issuer: this.issuer,
        audience: this.audience,
      },
    );

    return {
      accessToken,
    };
  }

  public verifyToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'signin',
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public isValidToken(token: string) {
    try {
      this.verifyToken(token);

      return true;
    } catch (_) {
      return false;
    }
  }

  public async signin(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretas.');
    }

    return this.createToken(user);
  }

  public async signup(authSignupDto: AuthSignupDto) {
    const user = await this.usersService.createUser(authSignupDto);

    return this.createToken(user);
  }

  public async forget(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto.');
    }

    return true;
  }

  public async reset(password: string, token: string) {
    const id = 0;

    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }
}
