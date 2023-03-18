export const enum LoggerLevel {
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}
export abstract class Logger {
  abstract log(message: string, extra?: unknown): void;
  abstract debug(message: string, extra?: unknown): void;
  abstract info(message: string, extra?: unknown): void;
  abstract warn(message: string, extra?: unknown): void;
  abstract error(message: string | Error, extra?: unknown): void;
}
