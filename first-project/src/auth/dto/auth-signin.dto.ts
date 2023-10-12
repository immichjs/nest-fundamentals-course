import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthSigninDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
      minLowercase: 1,
    },
    {
      message:
        'A senha deve ser forte, contendo letras maiúsculas, minúsculas, números e caracteres especiais.',
    },
  )
  password: string;
}
