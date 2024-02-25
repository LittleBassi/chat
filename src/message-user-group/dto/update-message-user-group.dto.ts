import { PartialType } from '@nestjs/swagger';
import { CreateMessageUserGroupDto } from './create-message-user-group.dto';

// Não adicione nada aqui, ele já importa todos os campos do Create (MappedType)
export class UpdateMessageUserGroupDto extends PartialType(CreateMessageUserGroupDto) {}
