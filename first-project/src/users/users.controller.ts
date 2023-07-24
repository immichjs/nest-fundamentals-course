import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInterceptor } from 'src/interceptors/log/log.interceptor';
import { CustomParam } from 'src/decorators/param-id/custom-param.decorator';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  public async getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  public async getUserById(@CustomParam('id') id: number): Promise<Omit<User, 'password'>> {
    return this.usersService.getUserById(id);
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(createUserDto)
  }

  @Patch(':id')
  public async updateUser(
    @CustomParam('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  public deleteUser(@CustomParam('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
