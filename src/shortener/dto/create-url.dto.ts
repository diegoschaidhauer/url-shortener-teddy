import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    example: 'https://www.google.com/search?q=nestjs',
    description: 'URL completa que será encurtada',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
