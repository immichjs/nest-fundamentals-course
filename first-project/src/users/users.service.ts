import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birth_at: true,
        created_at: true,
        updated_at: true
      }
    });
  }

  public async getUserById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.existsUser(id)
      
    return user
  }

  public async createUser({ email, name, password, birth_at }: CreateUserDto): Promise<Omit<User, 'password'>> {
    if (birth_at) {
      birth_at = new Date(birth_at)
    } else {
      birth_at = null
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
        birth_at
      },
      select: {
        id: true,
        name: true,
        email: true,
        birth_at: true,
        created_at: true,
        updated_at: true
      }
    })

    return user;
  }

  public async updateUser(id: number, { name, email, password, birth_at }: UpdateUserDto): Promise<Omit<User, 'password'>> {
    await this.existsUser(id)

    if (birth_at) {
      birth_at = new Date(birth_at)
    } else {
      birth_at = null
    }

    return this.prismaService.user.update({
      data: {
        name,
        birth_at,
        email,
        password
      },
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        birth_at: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  public async deleteUser(id: number): Promise<void> {
    await this.getUserById(id)
    await this.prismaService.user.delete({ where: { id }})
  }

  public async existsUser(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({ where: { id }});
    
    if (!user)
      throw new NotFoundException('Usuário não encontrado.')
    
    return user
  }
}
