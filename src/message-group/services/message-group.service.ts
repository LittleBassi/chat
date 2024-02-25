import { Injectable } from '@nestjs/common';
import { MessageGroup } from '../entities/message-group.entity';
import { CreateMessageGroupDto } from '../dto/create-message-group.dto';
import { UpdateMessageGroupDto } from '../dto/update-message-group.dto';
import { MessageGroupRepositoryService } from './message-group.repository.service';
import { DataSource, In, IsNull } from 'typeorm';
import { MessageUserGroup } from '@/message-user-group/entities/message-user-group.entity';
import { MessageUserGroupRepositoryService } from '@/message-user-group/services/message-user-group.repository.service';

@Injectable()
export class MessageGroupService {
  constructor(
    private readonly messageGroupRepositoryService: MessageGroupRepositoryService,
    private readonly messageUserGroupRepositoryService: MessageUserGroupRepositoryService,
    private readonly dataSource: DataSource
  ) {}

  async create(createMessageGroupDto: CreateMessageGroupDto): Promise<MessageGroup> {
    let messageGroupId = null;
    await this.dataSource.transaction(async (transaction) => {
      const messageGroup = transaction.create(MessageGroup, createMessageGroupDto);
      await transaction.save(messageGroup);
      messageGroupId = messageGroup.id;

      const messageUserGroup = transaction.create(MessageUserGroup, {
        user_id: createMessageGroupDto.user_id,
        message_group_id: messageGroup.id,
      });
      await transaction.save(messageUserGroup);
    });
    if (!messageGroupId) {
      return null;
    }
    return await this.messageGroupRepositoryService.findOne({ id: messageGroupId });
  }

  async findByUser(userId: number): Promise<MessageGroup[]> {
    const groupsByUser = await this.messageUserGroupRepositoryService.find({
      user_id: userId,
    });
    const groupsIdsByUser = groupsByUser.map((item) => item.message_group_id);
    return await this.messageGroupRepositoryService.find({
      id: groupsIdsByUser.length > 0 ? In(groupsIdsByUser) : IsNull(),
    });
  }

  async update(id: number, updateMessageGroupDto: UpdateMessageGroupDto): Promise<MessageGroup> {
    const messageGroup = await this.messageGroupRepositoryService.create(updateMessageGroupDto);
    await this.messageGroupRepositoryService.update(id, messageGroup);
    return await this.messageGroupRepositoryService.findOne({ id });
  }
}
