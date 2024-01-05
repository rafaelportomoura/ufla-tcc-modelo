import winston from 'winston';
import { CreateLoggerParams, Logger } from '../types/Logger';

export const create_logger = ({ level, metadata }: CreateLoggerParams): Logger =>
  winston.createLogger({
    level,
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
    defaultMeta: metadata
  });
