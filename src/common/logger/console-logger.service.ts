import { LoggerInterface } from './logger.interface.js';

export class ConsoleLoggerService implements LoggerInterface {

  public debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  public warning(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }

}
