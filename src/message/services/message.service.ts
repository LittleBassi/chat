import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { Message } from '../entities/message.entity';
import { MessageRepositoryService } from './message.repository.service';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepositoryService: MessageRepositoryService) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = await this.messageRepositoryService.create(createMessageDto);
    await this.messageRepositoryService.save(message);
    return await this.messageRepositoryService.findOne({ id: message.id });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.messageRepositoryService.create(updateMessageDto);
    await this.messageRepositoryService.update(id, message);
    return await this.messageRepositoryService.findOne({ id });
  }
}
