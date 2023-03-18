import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger as WinstonLoggerType, transports } from 'winston';
import { Logger } from '../../domain/Logger';

@Injectable()
export class PrettyWinstonLogger implements Logger {
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
        // no files for now
        // new transports.File({
        //   filename: `logs/${Levels.ERROR}.log`,
        //   level: Levels.ERROR,
        // }),
      ],
    });
  }

  warn(message: string, extra?: unknown): void {
    this.logger.warn(message, extra);
    if (extra) {
      this.logger.warn(extra);
    }
  }

  debug(message: string, extra?: unknown): void {
    this.logger.debug(message, extra);
    if (extra) {
      this.logger.debug(extra);
    }
  }

  error(message: string | Error, extra?: unknown): void {
    this.logger.error(message);
    if (extra) {
      this.logger.error(extra);
    }
  }

  info(message: string, extra?: unknown): void {
    this.logger.info(message);
    if (extra) {
      this.logger.info(extra);
    }
  }

  log(message: string, extra?: unknown): void {
    this.logger.info(message);
    if (extra) {
      this.logger.info(extra);
    }
  }
}
