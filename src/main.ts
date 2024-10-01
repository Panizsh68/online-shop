import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { redisConfig } from './config/redis.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const redisMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT')
    }
  })

  await app.startAllMicroservices()

  const config = new DocumentBuilder()
    .setTitle('Online Shop')
    .setVersion('2.0')
    .addTag('online shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTO instances
  }));

  // Get port from configService
  const port = configService.get<number>('PORT');  // Default port 3000 if not found
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();