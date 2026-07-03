import { ConsoleLogger } from './console';
import { SentryLogger } from './sentry';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface Logger {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  child(context: Record<string, any>): Logger;
}

export class LoggerFactory {
  private static instance: Logger;
  private static consoleLogger = new ConsoleLogger();

  static getLogger(context?: Record<string, any>): Logger {
    if (!this.instance) {
      // Use Sentry if available
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        this.instance = new SentryLogger(context);
      } else {
        this.instance = this.consoleLogger;
      }
    }
    return this.instance;
  }

  static setLogger(logger: Logger) {
    this.instance = logger;
  }

  static getConsoleLogger(): ConsoleLogger {
    return this.consoleLogger;
  }
}

export const logger = LoggerFactory.getLogger();
