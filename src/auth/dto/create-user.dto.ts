import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'diego@email.com',
    description: 'Endereço de e-mail válido',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário (mínimo de 6 caracteres)',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
