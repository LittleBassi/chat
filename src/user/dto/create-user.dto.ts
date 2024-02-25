import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: 'string',
    default: 'Foo Bar',
  })
  @IsNotEmpty({ message: 'Nome deve ser preenchido' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    type: 'string',
    default: 'foo@example.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'E-mail deve ser preenchido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    type: 'string',
    default: '123',
  })
  @IsNotEmpty({ message: 'Senha deve ser preenchida' })
  password: string;
}
