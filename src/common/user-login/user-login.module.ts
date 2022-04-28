import { Module } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { UserLoginController } from './user-login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './entities/user-login.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [UserLoginController],
  providers: [UserLoginService],
  imports: [TypeOrmModule.forFeature([UserLogin]), UsersModule],
  exports: [UserLoginService]
})
export class UserLoginModule {}
