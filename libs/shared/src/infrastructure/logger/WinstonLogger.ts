import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger as WinstonLoggerType, transports } from 'winston';
import { Logger } from '../../domain/Logger';

enum Levels {
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}

@Injectable()
export class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.prettyPrint(),
        format.errors({ stack: true }),
        format.splat(),
        format.colorize(),
        format.simple(),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: `logs/${Levels.ERROR}.log`,
          level: Levels.ERROR,
        }),
      ],
    });
  }

  warn(message: string, extra?: unknown): void {
    this.logger.warn(message, extra);
  }

  debug(message: string, extra?: unknown): void {
    this.logger.debug(message, extra);
  }

  error(message: string | Error, extra?: unknown): void {
    this.logger.error(message);
    this.logger.error(extra);
  }

  info(message: string, extra?: unknown): void {
    this.logger.info(message, extra);
  }
}
