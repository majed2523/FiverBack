import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation for all DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: ['http://192.168.1.82:8081', 'http://localhost:8081'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // ✅ Log every request
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method} ${req.url}`, 'HTTP');
    next();
  });

  await app.listen(3000, '0.0.0.0');
  Logger.log('🚀 Backend is running on http://0.0.0.0:3000', 'Bootstrap');
}
bootstrap();
