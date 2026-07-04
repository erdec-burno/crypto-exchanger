/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ADMIN_APP_ORIGIN ?? 'http://localhost:4201',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  const host = process.env.HOST ?? 'localhost';
  await app.listen(port, host);
  Logger.log(`Application is running on: http://${host}:${port}`);
}

bootstrap();
