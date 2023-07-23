import { IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Min, MinLength, ValidationArguments } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  name: string;

  @IsEmail({}, { message: 'Verifique o email e tente novamente' })
  email: string;

  @IsOptional()
  @IsDateString()
  birth_at?: Date;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
    minLowercase: 1,
  }, {
    message: 'A senha deve ser forte, contendo letras maiúsculas, minúsculas, números e caracteres especiais.'
  })
  password: string;
}
