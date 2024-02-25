import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { MessageModule } from './message/message.module';
import { MessageGroupModule } from './message-group/message-group.module';
import { MessageUserGroupModule } from './message-user-group/message-user-group.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 10, // Tempo de vida (em segundos)
      limit: 50, // Número de requisições dentro do ttl para o mesmo IP
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    MessageModule,
    MessageGroupModule,
    MessageUserGroupModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [TypeOrmConfigService, AppService],
})
export class AppModule {}
