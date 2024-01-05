export interface Logger {
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  info(...args: unknown[]): void;
  verbose(...args: unknown[]): void;
  debug(...args: unknown[]): void;
  silly(...args: unknown[]): void;
}

export class CreateLoggerParams {
  level: keyof Logger;

  metadata: Record<string, unknown>;
}
