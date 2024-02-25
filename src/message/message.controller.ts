import { Controller, Post, Body, ConflictException, Get, Param } from '@nestjs/common';
import { AuthDecorator, Decorator, GetUser } from '@/utils/utils.decorator';
import { MessageService } from './services/message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '@/user/entities/user.entity';
import { Message } from './entities/message.entity';
import { MessageUserGroupRepositoryService } from '@/message-user-group/services/message-user-group.repository.service';
import { UserRepositoryService } from '@/user/services/user.repository.service';
import { MessageRepositoryService } from './services/message.repository.service';
import { IsNull } from 'typeorm';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageRepositoryService: MessageRepositoryService,
    private readonly messageUserGroupRepositoryService: MessageUserGroupRepositoryService,
    private readonly userRepositoryService: UserRepositoryService
  ) {}

  @Post()
  @AuthDecorator()
  @Decorator('message', 'Criar mensagem')
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: User
  ): Promise<Message> {
    if (createMessageDto.message_group_id) {
      const isUserInGroup = await this.messageUserGroupRepositoryService.findOne({
        user_id: user.id,
        message_group_id: createMessageDto.message_group_id,
      });
      if (!isUserInGroup) {
        throw new ConflictException('Grupo de mensagens não encontrado');
      }
      if (createMessageDto.user_reciever_id) {
        const userExists = await this.userRepositoryService.findOne({
          id: createMessageDto.user_id,
        });
        if (!userExists) {
          throw new ConflictException('Usuário não encontrado');
        }
        const isUserRecieverInGroup = await this.messageUserGroupRepositoryService.findOne({
          user_id: createMessageDto.user_reciever_id,
          message_group_id: createMessageDto.message_group_id,
        });
        if (!isUserRecieverInGroup) {
          throw new ConflictException('Usuário não encontrado');
        }
      }
    } else {
      if (createMessageDto.user_reciever_id) {
        const userExists = await this.userRepositoryService.findOne({
          id: createMessageDto.user_reciever_id,
        });
        if (!userExists) {
          throw new ConflictException('Usuário não encontrado');
        }
      }
    }
    const message = await this.messageService.create({
      ...createMessageDto,
      user_id: user.id,
    });
    if (!message) {
      throw new ConflictException('Erro ao cadastrar lançamento financeiro');
    }
    return message;
  }

  @Get('message-group/:message_group_id')
  @AuthDecorator()
  @Decorator('message', 'Buscar mensagens por grupo')
  async findByGroup(
    @Param('message_group_id') messageGroupId: string,
    @GetUser() user: User
  ): Promise<Message[]> {
    const isUserInGroup = await this.messageUserGroupRepositoryService.findOne({
      user_id: user.id,
      message_group_id: +messageGroupId,
    });
    if (!isUserInGroup) {
      throw new ConflictException('Grupo de mensagens não encontrado');
    }
    return await this.messageRepositoryService.find({ message_group_id: +messageGroupId });
  }

  @Get('user-reciever/:user_reciever_id')
  @AuthDecorator()
  @Decorator('message', 'Buscar mensagens de conversa direta com outro usuário')
  async findByUserAndReciever(
    @Param('user_reciever_id') userRecieverId: string,
    @GetUser() user: User
  ): Promise<Message[]> {
    return await this.messageRepositoryService.find([
      {
        user_id: user.id,
        user_reciever_id: +userRecieverId,
        message_group_id: IsNull(),
      },
      {
        user_id: +userRecieverId,
        user_reciever_id: user.id,
        message_group_id: IsNull(),
      },
    ]);
  }
}
