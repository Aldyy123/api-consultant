import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserLoginModule } from '../user-login/user-login.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.startegy';
import { AuthController } from './auth.controller';

@Module({
    providers: [AuthService, LocalStrategy],
    imports: [UserLoginModule, PassportModule],
    controllers: [AuthController]
})
export class AuthModule {}
