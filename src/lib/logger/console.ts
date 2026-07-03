import { Logger, LogLevel } from './index';

export class ConsoleLogger implements Logger {
  private context: Record<string, any>;
  private level: LogLevel;

  constructor(context: Record<string, any> = {}, level: LogLevel = LogLevel.DEBUG) {
    this.context = context;
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatMessage(message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = Object.keys(this.context).length
      ? ` [${Object.entries(this.context).map(([k, v]) => `${k}=${v}`).join(' ')}]`
      : '';
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}]${contextStr} ${message}${metaStr}`;
  }

  debug(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(message, meta));
    }
  }

  error(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(message, meta));
    }
  }

  child(context: Record<string, any>): Logger {
    return new ConsoleLogger(
      { ...this.context, ...context },
      this.level
    );
  }
}
