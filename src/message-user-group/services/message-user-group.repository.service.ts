import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMessageUserGroupDto } from '../dto/create-message-user-group.dto';
import { UpdateMessageUserGroupDto } from '../dto/update-message-user-group.dto';
import { MessageUserGroup } from '../entities/message-user-group.entity';
import {
  MessageUserGroupOrder,
  MessageUserGroupParams,
} from '../entities/message-user-group.interface';
import { MessageGroup } from '@/message-group/entities/message-group.entity';
import { MessageGroupParams } from '@/message-group/entities/message-group.interface';

@Injectable()
export class MessageUserGroupRepositoryService {
  constructor(
    @InjectRepository(MessageUserGroup)
    private readonly messageUserGroupRepository: Repository<MessageUserGroup>,
    @InjectRepository(MessageGroup)
    private readonly messageGroupRepository: Repository<MessageGroup>
  ) {}

  async create(
    messageUserGroupDto: CreateMessageUserGroupDto | UpdateMessageUserGroupDto
  ): Promise<MessageUserGroup> {
    return this.messageUserGroupRepository.create(messageUserGroupDto);
  }

  async save(messageUserGroup: MessageUserGroup): Promise<MessageUserGroup> {
    return await this.messageUserGroupRepository.save(messageUserGroup);
  }

  async findOne(
    params?: MessageUserGroupParams | MessageUserGroupParams[]
  ): Promise<MessageUserGroup> {
    if (!params) {
      return null;
    }
    return await this.messageUserGroupRepository.findOne({ where: params });
  }

  async find(
    params?: MessageUserGroupParams | MessageUserGroupParams[],
    order?: MessageUserGroupOrder
  ): Promise<MessageUserGroup[]> {
    if (params) {
      if (order) {
        return await this.messageUserGroupRepository.find({ where: params, order });
      }
      return await this.messageUserGroupRepository.find({ where: params });
    }
    if (order) {
      return await this.messageUserGroupRepository.find({ order });
    }
    return await this.messageUserGroupRepository.find();
  }

  async findPaged(
    skip: number,
    take: number,
    params?: MessageUserGroupParams,
    order?: MessageUserGroupOrder
  ): Promise<[MessageUserGroup[], number]> {
    if (params) {
      if (order) {
        return await this.messageUserGroupRepository.findAndCount({
          where: params,
          skip: skip * take,
          take,
          order,
        });
      }
      return await this.messageUserGroupRepository.findAndCount({
        where: params,
        skip: skip * take,
        take,
      });
    }
    if (order) {
      return await this.messageUserGroupRepository.findAndCount({
        skip: skip * take,
        take,
        order,
      });
    }
    return await this.messageUserGroupRepository.findAndCount({ skip: skip * take, take });
  }

  async update(id: number, messageUserGroup: MessageUserGroup): Promise<UpdateResult> {
    if (!id) {
      return null;
    }
    return await this.messageUserGroupRepository.update(id, messageUserGroup);
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!id) {
      return null;
    }
    return await this.messageUserGroupRepository.softDelete(id);
  }

  async findOneMessageGroup(
    params?: MessageGroupParams | MessageGroupParams[]
  ): Promise<MessageGroup> {
    if (!params) {
      return null;
    }
    return await this.messageGroupRepository.findOne({ where: params });
  }
}
