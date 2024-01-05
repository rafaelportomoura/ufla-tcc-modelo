import winston, { format } from 'winston';
import { CONFIGURATION } from '../constants/configuration';
import { CreateLoggerParams, Logger } from '../types/Logger';

export const create_logger = ({ level = CONFIGURATION.LOG_LEVEL, metadata }: CreateLoggerParams): Logger =>
  winston.createLogger({
    level,
    format: format.json(),
    transports: [new winston.transports.Console()],
    defaultMeta: { metadata }
  });
