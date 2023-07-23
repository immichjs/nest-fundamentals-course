import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  public async getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Omit<User, 'password'>> {
    return this.usersService.getUserById(id);
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(createUserDto)
  }

  @Patch(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
