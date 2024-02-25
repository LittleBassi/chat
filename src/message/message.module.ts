import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './services/message.service';
import { MessageRepositoryService } from './services/message.repository.service';
import { MessageUserGroupModule } from '@/message-user-group/message-user-group.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), MessageUserGroupModule, UserModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepositoryService],
  exports: [MessageService, MessageRepositoryService],
})
export class MessageModule {}
