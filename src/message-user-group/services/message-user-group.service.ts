import { Injectable } from '@nestjs/common';
import { MessageUserGroup } from '../entities/message-user-group.entity';
import { CreateMessageUserGroupDto } from '../dto/create-message-user-group.dto';
import { UpdateMessageUserGroupDto } from '../dto/update-message-user-group.dto';
import { MessageUserGroupRepositoryService } from './message-user-group.repository.service';
import { UserService } from '@/user/services/user.service';

@Injectable()
export class MessageUserGroupService {
  constructor(
    private readonly messageUserGroupRepositoryService: MessageUserGroupRepositoryService,
    private readonly userService: UserService
  ) {}

  async create(createMessageUserGroupDto: CreateMessageUserGroupDto): Promise<MessageUserGroup> {
    const messageUserGroup = await this.messageUserGroupRepositoryService.create(
      createMessageUserGroupDto
    );
    await this.messageUserGroupRepositoryService.save(messageUserGroup);
    return await this.messageUserGroupRepositoryService.findOne({ id: messageUserGroup.id });
  }

  async usersByGroup(messageGroupId: number): Promise<MessageUserGroup[]> {
    const links = await this.messageUserGroupRepositoryService.find({
      message_group_id: messageGroupId,
    });
    for (const link of links) {
      link.user = await this.userService.findOneInfo(link.user_id);
    }
    return links;
  }

  async update(
    id: number,
    updateMessageUserGroupDto: UpdateMessageUserGroupDto
  ): Promise<MessageUserGroup> {
    const messageUserGroup = await this.messageUserGroupRepositoryService.create(
      updateMessageUserGroupDto
    );
    await this.messageUserGroupRepositoryService.update(id, messageUserGroup);
    return await this.messageUserGroupRepositoryService.findOne({ id });
  }
}
