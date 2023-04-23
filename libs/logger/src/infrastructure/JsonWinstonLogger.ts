import { Injectable } from '@nestjs/common';
import { Logger as WinstonLoggerType, createLogger, format, transports } from 'winston';
import { Logger } from '../domain/Logger';

@Injectable()
export class JsonWinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = createLogger({
      format: format.json(),
      transports: [new transports.Console()],
    });
  }

  warn(message: string, extra?: unknown): void {
    this.logger.warn(
      typeof extra === 'object' ? { message, ...extra } : { message, extra },
    );
  }

  debug(message: string, extra?: unknown): void {
    this.logger.debug(
      typeof extra === 'object' ? { message, ...extra } : { message, extra },
    );
  }

  error(message: string | Error, extra?: unknown): void {
    this.logger.error(
      typeof extra === 'object' ? { message, ...extra } : { message, extra },
    );
  }

  info(message: string, extra?: unknown): void {
    this.logger.info(
      typeof extra === 'object' ? { message, ...extra } : { message, extra },
    );
  }

  log(message: string, extra?: unknown): void {
    this.logger.info(
      typeof extra === 'object' ? { message, ...extra } : { message, extra },
    );
  }
}
