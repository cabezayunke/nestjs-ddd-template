import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from './domain/Logger';
import { JsonWinstonLogger } from './infrastructure/JsonWinstonLogger';
import { NoOpLogger } from './infrastructure/NoOpLogger';
import { PrettyWinstonLogger } from './infrastructure/PrettyWinstonLogger';

const loggerFactory = (configService: ConfigService): Logger => {
  if (configService.get('isLocal')) {
    return new PrettyWinstonLogger();
  }
  if (configService.get('isTest')) {
    return new NoOpLogger();
  }
  return new JsonWinstonLogger();
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Logger,
      useFactory: loggerFactory,
      inject: [ConfigService],
    },
    PrettyWinstonLogger,
    JsonWinstonLogger,
    NoOpLogger,
  ],
  exports: [
    {
      provide: Logger,
      useFactory: loggerFactory,
      inject: [ConfigService],
    },
    PrettyWinstonLogger,
    JsonWinstonLogger,
    NoOpLogger,
  ],
})
export class LoggerModule {}
