import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@shared/domain/Logger';
import { CoreApiModule } from './CoreApiModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreApiModule);
  const configService = app.get(ConfigService);

  // logging
  const logger = app.get(Logger);
  app.useLogger(logger as LoggerService);

  // docs
  if (configService.get<boolean>('isLocal')) {
    const config = new DocumentBuilder()
      .setTitle('Curtis Core API')
      .setDescription('Curtis core management endpoints')
      .setVersion('1.0')
      .addTag('core')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // server
  await app.listen(configService.get<number>('serverPort') as number);
  logger.info('Starting server', configService.get('serverPort'));
}
bootstrap();
