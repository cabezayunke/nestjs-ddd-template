import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@shared/domain/Logger';
import { CoreApiModule } from './CoreApiModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreApiModule);

  // logging
  const logger = app.get(Logger);
  app.useLogger(logger as LoggerService);

  // server
  const configService = app.get(ConfigService);

  await app.listen(configService.get('serverPort') as number);
  logger.info('Starting server', configService.get('serverPort'));
}
bootstrap();
