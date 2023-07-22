import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  public getUserById(@Param('id') id: number): User {
    return this.usersService.getUserById(id);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  public updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: number): void {
    return this.usersService.deleteUser(id);
  }
}
