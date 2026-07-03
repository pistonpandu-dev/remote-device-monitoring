import { Logger, LogLevel } from './index';

export class SentryLogger implements Logger {
  private context: Record<string, any>;
  private level: LogLevel;

  constructor(context: Record<string, any> = {}, level: LogLevel = LogLevel.INFO) {
    this.context = context;
    this.level = level;
  }

  private captureMessage(message: string, level: string, meta?: any) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      const Sentry = (window as any).Sentry;
      Sentry.captureMessage(message, {
        level,
        extra: { ...this.context, ...meta },
      });
    }
  }

  debug(message: string, meta?: any): void {
    if (this.level <= LogLevel.DEBUG) {
      this.captureMessage(message, 'debug', meta);
    }
  }

  info(message: string, meta?: any): void {
    if (this.level <= LogLevel.INFO) {
      this.captureMessage(message, 'info', meta);
    }
  }

  warn(message: string, meta?: any): void {
    if (this.level <= LogLevel.WARN) {
      this.captureMessage(message, 'warning', meta);
    }
  }

  error(message: string, meta?: any): void {
    if (this.level <= LogLevel.ERROR) {
      this.captureMessage(message, 'error', meta);
    }
  }

  child(context: Record<string, any>): Logger {
    return new SentryLogger(
      { ...this.context, ...context },
      this.level
    );
  }
}
