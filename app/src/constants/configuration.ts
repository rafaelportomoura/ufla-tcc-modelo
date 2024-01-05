import { CreateLoggerParams } from '../types/Logger';

const set_env = <T = string>(key: string, default_value: unknown): T => (process.env[key] || default_value) as T;
const set_number_env = (key: string, default_value: number) => Number(set_env(key, default_value));

export const CONFIGURATION = {
  STAGE: set_env('STAGE', 'dev'),
  TENANT: set_env('TENANT', 'tcc'),
  REGION: set_env('REGION', 'us-east-2'),
  MONGO_SECRET: set_env('MONGO_SECRET', 'dev/tcc/mongodb'),
  CODE_PREFIX: set_env('CODE_PREFIX', 'prefix'),
  LOG_LEVEL: set_env<CreateLoggerParams['level']>('LOG_LEVEL', 'silly'),
  TTL: set_number_env('TTL', 86400),
  PORT: set_number_env('PORT', 3000)
} as const;
