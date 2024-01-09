import { Logger } from '../adapters/logger';
/* eslint-disable no-empty-function */
import { ExampleRepository } from '../repositories/exampleRepository';
import { Example } from '../types/Example';

export class GetBusiness {
  private repository: ExampleRepository;

  constructor(private logger: Logger) {
    this.repository = new ExampleRepository(logger);
  }

  async get(): Promise<Example> {
    this.logger.debug('GetBusiness.get()');
    return this.repository.getExample('id');
  }
}
