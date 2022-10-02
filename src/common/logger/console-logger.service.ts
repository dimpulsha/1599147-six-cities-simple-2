import pino, { Logger } from 'pino';
import { LoggerInterface } from './logger.interface.js';

export class ConsoleLoggerService implements LoggerInterface {
  private logger!: Logger;

  constructor() {
    this.logger = pino({
      level: 'debug'
    });
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warning(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

}
