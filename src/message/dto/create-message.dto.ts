import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @ApiHideProperty()
  @IsOptional()
  user_id: number;

  @ApiProperty({
    description: 'texto ',
    type: 'string',
    default: 'Texto',
  })
  @IsNotEmpty({ message: 'Texto da mensagem deve ser preenchido' })
  description: string;

  @ApiProperty()
  @IsOptional()
  user_reciever_id: number;

  @ApiProperty()
  @IsOptional()
  message_group_id: number;
}
