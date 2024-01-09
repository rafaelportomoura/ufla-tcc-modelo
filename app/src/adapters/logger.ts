/* eslint-disable no-console */
import { CONFIGURATION } from '../constants/configuration';
import { LOGGER_LEVEL_MAP } from '../constants/logger';
import { ILogger, LoggerLevel } from '../types/Logger';

export class Logger implements ILogger {
  private level: number;

  constructor(
    private tracing_id: string,
    level: LoggerLevel = CONFIGURATION.LOG_LEVEL
  ) {
    this.level = LOGGER_LEVEL_MAP[level];
  }

  error(...args: unknown[]): void {
    if (this.level < LOGGER_LEVEL_MAP.error) return;
    this.flush('ERROR', ...args);
  }

  warn(...args: unknown[]): void {
    if (this.level < LOGGER_LEVEL_MAP.warn) return;
    this.flush('ERROR', ...args);
  }

  log(...args: unknown[]): void {
    if (this.level < LOGGER_LEVEL_MAP.log) return;
    this.flush(...args);
  }

  info(...args: unknown[]): void {
    if (this.level < LOGGER_LEVEL_MAP.info) return;
    this.flush('INFO', ...args);
  }

  verbose(...args: unknown[]): void {
    if (this.level < LOGGER_LEVEL_MAP.verbose) return;
    this.flush(...args);
  }

  debug(...args: unknown[]): void {
    if (this.level < LOGGER_LEVEL_MAP.debug) return;
    this.flush(...args);
  }

  private flush(...args: unknown[]): void {
    const { tracing_id } = this;
    const str = JSON.stringify;
    const mapper = (v: unknown) => (typeof v === 'object' ? str(v) : v);
    console.log(str({ tracing_id }), '|', ...args.map(mapper));
  }
}
