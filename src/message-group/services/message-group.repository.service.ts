import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMessageGroupDto } from '../dto/create-message-group.dto';
import { UpdateMessageGroupDto } from '../dto/update-message-group.dto';
import { MessageGroup } from '../entities/message-group.entity';
import { MessageGroupOrder, MessageGroupParams } from '../entities/message-group.interface';

@Injectable()
export class MessageGroupRepositoryService {
  constructor(
    @InjectRepository(MessageGroup)
    private readonly messageGroupRepository: Repository<MessageGroup>
  ) {}

  async create(
    messageGroupDto: CreateMessageGroupDto | UpdateMessageGroupDto
  ): Promise<MessageGroup> {
    return this.messageGroupRepository.create(messageGroupDto);
  }

  async save(messageGroup: MessageGroup): Promise<MessageGroup> {
    return await this.messageGroupRepository.save(messageGroup);
  }

  async findOne(params?: MessageGroupParams | MessageGroupParams[]): Promise<MessageGroup> {
    if (!params) {
      return null;
    }
    return await this.messageGroupRepository.findOne({ where: params });
  }

  async find(
    params?: MessageGroupParams | MessageGroupParams[],
    order?: MessageGroupOrder
  ): Promise<MessageGroup[]> {
    if (params) {
      if (order) {
        return await this.messageGroupRepository.find({ where: params, order });
      }
      return await this.messageGroupRepository.find({ where: params });
    }
    if (order) {
      return await this.messageGroupRepository.find({ order });
    }
    return await this.messageGroupRepository.find();
  }

  async findPaged(
    skip: number,
    take: number,
    params?: MessageGroupParams,
    order?: MessageGroupOrder
  ): Promise<[MessageGroup[], number]> {
    if (params) {
      if (order) {
        return await this.messageGroupRepository.findAndCount({
          where: params,
          skip: skip * take,
          take,
          order,
        });
      }
      return await this.messageGroupRepository.findAndCount({
        where: params,
        skip: skip * take,
        take,
      });
    }
    if (order) {
      return await this.messageGroupRepository.findAndCount({
        skip: skip * take,
        take,
        order,
      });
    }
    return await this.messageGroupRepository.findAndCount({ skip: skip * take, take });
  }

  async update(id: number, messageGroup: MessageGroup): Promise<UpdateResult> {
    if (!id) {
      return null;
    }
    return await this.messageGroupRepository.update(id, messageGroup);
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!id) {
      return null;
    }
    return await this.messageGroupRepository.softDelete(id);
  }
}
