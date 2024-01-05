import { Example } from '../types/Example';

export class ExampleRepository {
  async get(): Promise<Example> {
    return { ok: true };
  }
}
