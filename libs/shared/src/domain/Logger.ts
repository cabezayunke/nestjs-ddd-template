export abstract class Logger {
  abstract debug(message: string, extra?: unknown): void;
  abstract info(message: string, extra?: unknown): void;
  abstract warn(message: string, extra?: unknown): void;
  abstract error(message: string | Error, extra?: unknown): void;
}
