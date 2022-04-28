import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser'
import * as csurf from 'csurf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // app.use(cookieParser())
  // app.use(csurf({cookie: true}));
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
