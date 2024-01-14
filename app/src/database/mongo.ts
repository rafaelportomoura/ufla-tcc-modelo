/* eslint-disable no-empty-function */
import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import qs from 'qs';
import { Logger } from '../adapters/logger';
import { SecretsManager } from '../aws/secretsManager';
import { SSM } from '../aws/ssm';
import { CODE_MESSAGES } from '../constants/codeMessages';
import { CONFIGURATION } from '../constants/configuration';
import { DatabaseError } from '../exceptions/DatabaseError';
import { MongoParams, MongoSecret } from '../types/MongoSecret';

export class MongoDatabase {
  constructor(private logger = new Logger()) {}

  setLogger(logger: Logger) {
    this.logger = logger;
  }

  async connect(params_secret?: MongoSecret, mongo_params?: MongoParams) {
    try {
      if (mongoose.connection.readyState) return;

      let secrets = params_secret;
      if (isEmpty(secrets)) {
        const secret_manager = new SecretsManager();
        secrets = await secret_manager.getSecret<MongoSecret>(CONFIGURATION.MONGO_SECRET);
      }

      let params = mongo_params;
      if (isEmpty(params)) {
        const ssm = new SSM();
        params = await ssm.getParams<MongoParams>(CONFIGURATION.MONGO_PARAMS);
      }

      const { password, username } = secrets;
      const { protocol, host, database, options } = params;

      const query = !isEmpty(options) ? `?${qs.stringify(options)}` : '';

      const uri = `${protocol}://${username}:${password}@${host}/${database}${query}`;

      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, socketTimeoutMS: 360000 });
    } catch (error) {
      this.logger.error('MongoDatabase', error.message);
      throw new DatabaseError(CODE_MESSAGES.CANNOT_ACCESS_DATABASE);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}
