import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500 // limit each IP to 500 requests per windowMs
  }));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe()); 

  app.enableCors({
    'origin': app.get('ConfigService').get('CLIENT_BASE_URL'),
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
    'credentials': true
  });

  await app.listen(3005);
}
bootstrap();
