import { Logger } from '../adapters/logger';
/* eslint-disable no-empty-function */
import { DynamoDB } from '../aws/dynamodb';
import { Example } from '../types/Example';

export class ExampleRepository extends DynamoDB {
  constructor(private logger: Logger) {
    super('example');
  }

  async getExample(id: string): Promise<Example> {
    this.logger.debug(`ExampleRepository.get(${id})`);
    const response = await super.get({
      Key: { id }
    });
    return response.Item as Example;
  }
}
