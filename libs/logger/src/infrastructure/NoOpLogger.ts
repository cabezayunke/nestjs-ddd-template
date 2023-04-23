/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Logger } from '../domain/Logger';

@Injectable()
export class NoOpLogger implements Logger {
  warn(_message: string, _extra?: unknown): void {
    // empty logger for CI tests
  }

  debug(_message: string, _extra?: unknown): void {
    // empty logger for CI tests
  }

  error(_message: string | Error, _extra?: unknown): void {
    // empty logger for CI tests
  }

  info(_message: string, _extra?: unknown): void {
    // empty logger for CI tests
  }

  log(_message: string, _extra?: unknown): void {
    // empty logger for CI tests
  }
}
