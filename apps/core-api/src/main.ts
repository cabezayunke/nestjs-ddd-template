import { LoggerService, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Logger } from '@utils/logger/domain/Logger';
import { MetadataStorage, getFromContainer } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import 'reflect-metadata';
import { DomainErrorHandler } from '../../../libs/shared/src/domain/errors/DomainErrorHandler';
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
      .setTitle('Core API')
      .setDescription('Core API management endpoints')
      .setVersion('1.0')
      .addTag('core')
      .build();

    let document = SwaggerModule.createDocument(app, config);

    // Creating all the swagger schemas based on the class-validator decorators
    const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
    const schemas = validationMetadatasToSchemas(metadatas);
    document = {
      ...document,
      components: {
        ...document?.components,
        schemas: {
          ...document?.components?.schemas,
          ...schemas,
        } as Record<string, SchemaObject>,
      },
    };
    SwaggerModule.setup('api/docs', app, document);
  }

  // validation
  app.useGlobalPipes(new ValidationPipe());

  // errors
  app.useGlobalFilters(new DomainErrorHandler(logger));

  // server
  await app.listen(configService.get<number>('serverPort') as number);
  logger.info('Starting server', configService.get('serverPort'));
}
bootstrap();
