import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserRepositoryService } from './services/user.repository.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS_INVITE } from '@/auth/auth.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_CONSTANTS_INVITE.secret,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
  exports: [UserService, UserRepositoryService],
})
export class UserModule {}
