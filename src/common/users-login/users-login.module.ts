import { Module } from '@nestjs/common';
import { UsersLoginService } from './users-login.service';
import { UsersLoginController } from './users-login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLogin } from './entities/users-login.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [UsersLoginController],
  providers: [UsersLoginService],
  imports: [TypeOrmModule.forFeature([UsersLogin]), UsersModule],
  exports: [UsersLoginService],
})
export class UserLoginModule {}
