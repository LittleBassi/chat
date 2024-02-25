import { Controller, Post, Body, ConflictException, Get, Param, Delete } from '@nestjs/common';
import { AuthDecorator, Decorator, GetUser } from '@/utils/utils.decorator';
import { User } from '@/user/entities/user.entity';
import { MessageUserGroupService } from './services/message-user-group.service';
import { CreateMessageUserGroupDto } from './dto/create-message-user-group.dto';
import { MessageUserGroup } from './entities/message-user-group.entity';
import { MessageUserGroupRepositoryService } from './services/message-user-group.repository.service';
import { UserRepositoryService } from '@/user/services/user.repository.service';
import { DeleteResult } from 'typeorm';

@Controller('message-user-group')
export class MessageUserGroupController {
  constructor(
    private readonly messageUserGroupService: MessageUserGroupService,
    private readonly messageUserGroupRepositoryService: MessageUserGroupRepositoryService,
    private readonly userRepositoryService: UserRepositoryService
  ) {}

  @Post()
  @AuthDecorator()
  @Decorator('message-user-group', 'Adicionar usuário em um grupo de mensagens')
  async create(
    @Body() createMessageUserGroupDto: CreateMessageUserGroupDto,
    @GetUser() user: User
  ): Promise<MessageUserGroup> {
    const groupExists = await this.messageUserGroupRepositoryService.findOneMessageGroup({
      id: createMessageUserGroupDto.message_group_id,
    });
    if (!groupExists) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    const isUserInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: user.id,
      message_group_id: createMessageUserGroupDto.message_group_id,
    });
    if (!isUserInGroup) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    if (groupExists.user_id !== user.id) {
      throw new ConflictException('Usuário não possui permissão para adicionar outros membros');
    }
    const userExists = await this.userRepositoryService.findOne({
      id: createMessageUserGroupDto.user_id,
    });
    if (!userExists) {
      throw new ConflictException('Usuário não encontrado');
    }
    const userAlreadyInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: createMessageUserGroupDto.user_id,
      message_group_id: createMessageUserGroupDto.message_group_id,
    });
    if (userAlreadyInGroup) {
      throw new ConflictException('Usuário já pertence ao grupo de mensagens');
    }
    const messageUserGroup = await this.messageUserGroupService.create(createMessageUserGroupDto);
    if (!messageUserGroup) {
      throw new ConflictException('Erro ao adicionar usuário ao grupo de mensagens');
    }
    return messageUserGroup;
  }

  @Get('message-group/:message_group_id')
  @AuthDecorator()
  @Decorator('message-user-group', 'Listar usuários de um grupo')
  async usersByGroup(
    @Param('message_group_id') messageGroupId: string,
    @GetUser() user: User
  ): Promise<MessageUserGroup[]> {
    const groupExists = await this.messageUserGroupRepositoryService.findOneMessageGroup({
      id: +messageGroupId,
    });
    if (!groupExists) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    const isUserInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: user.id,
      message_group_id: +messageGroupId,
    });
    if (!isUserInGroup) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    return await this.messageUserGroupService.usersByGroup(+messageGroupId);
  }

  @Delete('message-group/:message_group_id/user/:user_id')
  @AuthDecorator()
  @Decorator('message-user-group', 'Remover usuário em um grupo de mensagens')
  async remove(
    @Param('message_group_id') messageGroupId: string,
    @Param('user_id') userId: string,
    @GetUser() user: User
  ): Promise<DeleteResult> {
    const groupExists = await this.messageUserGroupRepositoryService.findOneMessageGroup({
      id: +messageGroupId,
    });
    if (!groupExists) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    const isUserInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: user.id,
      message_group_id: +messageGroupId,
    });
    if (!isUserInGroup) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    if (groupExists.user_id !== user.id) {
      throw new ConflictException('Usuário não possui permissão para adicionar outros membros');
    }
    const userExistsInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: +userId,
      message_group_id: +messageGroupId,
    });
    if (!userExistsInGroup) {
      throw new ConflictException('Usuário já pertence ao grupo de mensagens');
    }
    const deleteResult = await this.messageUserGroupRepositoryService.remove(userExistsInGroup.id);
    if (deleteResult?.affected === 0) {
      throw new ConflictException('Erro ao excluir usuário logado');
    }
    return deleteResult;
  }
}
