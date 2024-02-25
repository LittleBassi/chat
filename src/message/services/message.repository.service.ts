import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { Message } from '../entities/message.entity';
import { MessageOrder, MessageParams } from '../entities/message.interface';

@Injectable()
export class MessageRepositoryService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async create(messageDto: CreateMessageDto | UpdateMessageDto): Promise<Message> {
    return this.messageRepository.create(messageDto);
  }

  async save(message: Message): Promise<Message> {
    return await this.messageRepository.save(message);
  }

  async findOne(params?: MessageParams | MessageParams[]): Promise<Message> {
    if (!params) {
      return null;
    }
    return await this.messageRepository.findOne({ where: params });
  }

  async find(params?: MessageParams | MessageParams[], order?: MessageOrder): Promise<Message[]> {
    if (params) {
      if (order) {
        return await this.messageRepository.find({ where: params, order });
      }
      return await this.messageRepository.find({ where: params });
    }
    if (order) {
      return await this.messageRepository.find({ order });
    }
    return await this.messageRepository.find();
  }

  async findPaged(
    skip: number,
    take: number,
    params?: MessageParams,
    order?: MessageOrder
  ): Promise<[Message[], number]> {
    if (params) {
      if (order) {
        return await this.messageRepository.findAndCount({
          where: params,
          skip: skip * take,
          take,
          order,
        });
      }
      return await this.messageRepository.findAndCount({
        where: params,
        skip: skip * take,
        take,
      });
    }
    if (order) {
      return await this.messageRepository.findAndCount({
        skip: skip * take,
        take,
        order,
      });
    }
    return await this.messageRepository.findAndCount({ skip: skip * take, take });
  }

  async update(id: number, message: Message): Promise<UpdateResult> {
    if (!id) {
      return null;
    }
    return await this.messageRepository.update(id, message);
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!id) {
      return null;
    }
    return await this.messageRepository.softDelete(id);
  }
}
