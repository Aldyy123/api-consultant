import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './common/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './common/users/entities/users.entity';
import { LoggerMiddleware } from './common/middleware/logger.middler';
import { AuthModule } from './common/auth/auth.module';
import { UserLoginModule } from './common/users-login/users-login.module';
import { UsersLogin } from './common/users-login/entities/users-login.entity';
import { Role } from './common/users/entities/role.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'consultant',
      entities: [Users, UsersLogin, Role],
      synchronize: true,
    }),
    AuthModule,
    UserLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
