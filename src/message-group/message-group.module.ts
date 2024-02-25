import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGroup } from './entities/message-group.entity';
import { MessageGroupController } from './message-group.controller';
import { MessageGroupService } from './services/message-group.service';
import { MessageGroupRepositoryService } from './services/message-group.repository.service';
import { MessageUserGroupModule } from '@/message-user-group/message-user-group.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageGroup]), MessageUserGroupModule],
  controllers: [MessageGroupController],
  providers: [MessageGroupService, MessageGroupRepositoryService],
  exports: [MessageGroupService, MessageGroupRepositoryService],
})
export class MessageGroupModule {}
