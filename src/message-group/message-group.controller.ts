import { Controller, Post, Body, ConflictException, Delete, Param, Get } from '@nestjs/common';
import { AuthDecorator, Decorator, GetUser } from '@/utils/utils.decorator';
import { User } from '@/user/entities/user.entity';
import { MessageGroupService } from './services/message-group.service';
import { CreateMessageGroupDto } from './dto/create-message-group.dto';
import { MessageGroup } from './entities/message-group.entity';
import { MessageGroupRepositoryService } from './services/message-group.repository.service';
import { DeleteResult } from 'typeorm';
import { MessageUserGroupRepositoryService } from '@/message-user-group/services/message-user-group.repository.service';

@Controller('message-group')
export class MessageGroupController {
  constructor(
    private readonly messageGroupService: MessageGroupService,
    private readonly messageGroupRepositoryService: MessageGroupRepositoryService,
    private readonly messageUserGroupRepositoryService: MessageUserGroupRepositoryService
  ) {}

  @Post()
  @AuthDecorator()
  @Decorator('message-group', 'Criar grupo de mensagens')
  async create(
    @Body() createMessageGroupDto: CreateMessageGroupDto,
    @GetUser() user: User
  ): Promise<MessageGroup> {
    const messageGroup = await this.messageGroupService.create({
      ...createMessageGroupDto,
      user_id: user.id,
    });
    if (!messageGroup) {
      throw new ConflictException('Erro ao criar grupo de mensagens');
    }
    return messageGroup;
  }

  @Get(':id')
  @AuthDecorator()
  @Decorator('message-group', 'Buscar grupo de mensagens que usuário participa por ID')
  async findOne(@Param('id') id: string, @GetUser() user: User): Promise<MessageGroup> {
    const messageGroupExists = await this.messageGroupRepositoryService.findOne({
      id: +id,
    });
    if (!messageGroupExists) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    const isUserInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: user.id,
      message_group_id: messageGroupExists.id,
    });
    if (!isUserInGroup) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    return messageGroupExists;
  }

  @Get()
  @AuthDecorator()
  @Decorator('message-group', 'Buscar grupos de mensagens que usuário participa')
  async findByUser(@GetUser() user: User): Promise<MessageGroup[]> {
    return await this.messageGroupService.findByUser(user.id);
  }

  @Delete(':id')
  @AuthDecorator()
  @Decorator('message-group', 'Remover grupo de mensagens')
  async remove(@Param('id') id: string, @GetUser() user: User): Promise<DeleteResult> {
    const messageGroupExists = await this.messageGroupRepositoryService.findOne({
      id: +id,
      user_id: user.id,
    });
    if (!messageGroupExists) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    const deleteResult = await this.messageGroupRepositoryService.remove(+user.id);
    if (deleteResult?.affected === 0) {
      throw new ConflictException('Erro ao excluir usuário logado');
    }
    return deleteResult;
  }
}
