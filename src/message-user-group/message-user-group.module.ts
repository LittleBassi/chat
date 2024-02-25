import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageUserGroup } from './entities/message-user-group.entity';
import { MessageUserGroupController } from './message-user-group.controller';
import { MessageUserGroupService } from './services/message-user-group.service';
import { MessageUserGroupRepositoryService } from './services/message-user-group.repository.service';
import { MessageGroup } from '@/message-group/entities/message-group.entity';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageUserGroup, MessageGroup]), UserModule],
  controllers: [MessageUserGroupController],
  providers: [MessageUserGroupService, MessageUserGroupRepositoryService],
  exports: [MessageUserGroupService, MessageUserGroupRepositoryService],
})
export class MessageUserGroupModule {}
