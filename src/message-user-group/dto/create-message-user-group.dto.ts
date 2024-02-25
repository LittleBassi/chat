import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageUserGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  message_group_id: number;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;
}
