/* eslint-disable no-empty-function */
import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import qs from 'qs';
import { SecretsManager } from '../aws/secretsManager';
import { CODE_MESSAGES } from '../constants/codeMessages';
import { CONFIGURATION } from '../constants/configuration';
import { DatabaseError } from '../exceptions/DatabaseError';
import { Logger } from '../types/Logger';
import { MongoSecret } from '../types/MongoSecret';

export class MongoDatabase {
  constructor(private logger: Logger) {}

  async connect(params_secret?: MongoSecret) {
    try {
      if (mongoose.connection.readyState) return;

      let secrets = params_secret;
      if (isEmpty(secrets)) {
        const secret_manager = new SecretsManager();
        secrets = await secret_manager.getSecret<MongoSecret>(CONFIGURATION.MONGO_SECRET);
      }

      const { protocol, host, password, username, database, options } = secrets;

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
