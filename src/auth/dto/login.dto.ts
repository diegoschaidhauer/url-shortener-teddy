import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'diego@email.com',
    description: 'E-mail previamente cadastrado',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha cadastrada do usuário',
  })
  @IsNotEmpty()
  password: string;
}
