import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private _users: User[] = [];

  public getUsers(): User[] {
    return this._users;
  }

  public getUserById(id: number): any {
    const user = this._users.filter((user) => user.id === Number(id))[0];

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  public createUser({ name, age }: CreateUserDto) {
    if (!name || !age) {
      throw new BadRequestException(
        'Erro na solicitação de criação de novo usuário.',
      );
    }

    let generateId: number;

    if (this._users.length === 0) {
      generateId = 1;
    } else {
      generateId = this._users[this._users.length - 1].id;
      generateId++;
    }

    const user = { id: generateId, name, age };
    this._users.push(user);

    return user;
  }

  public updateUser(id: number, { name, age }: UpdateUserDto) {
    const filterUserById = (user) => user.id === Number(id);
    const hasUserIndex = this._users.findIndex(filterUserById);
    const hasUser = this._users.filter(filterUserById)[0];

    if (name) hasUser.name = name;
    if (age) hasUser.age = age;

    this._users.splice(hasUserIndex, 1, hasUser);

    return hasUser;
  }

  public deleteUser(id: number): void {
    const hasUserIndex = this._users.findIndex(
      (user) => user.id === Number(id),
    );

    if (hasUserIndex < 0) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    this._users.splice(hasUserIndex, 1);
  }
}
