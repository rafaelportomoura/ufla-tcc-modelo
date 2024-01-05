/* eslint-disable no-empty-function */
import { ExampleRepository } from '../repositories/exampleRepository';
import { Example } from '../types/Example';

export class GetBusiness {
  constructor(private repository = new ExampleRepository()) {}

  async get(): Promise<Example> {
    return this.repository.get();
  }
}
