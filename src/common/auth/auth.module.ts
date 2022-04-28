import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserLoginModule } from '../user-login/user-login.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.startegy';

@Module({
    providers: [AuthService, LocalStrategy],
    imports: [UserLoginModule, PassportModule]
})
export class AuthModule {}
