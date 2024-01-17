/* eslint-disable no-empty-function */
import { GetParameterCommand, GetParameterRequest, SSMClient } from '@aws-sdk/client-ssm';
import { AWS_CONFIGURATION } from '../constants/aws';

export class SSM {
  constructor(private client = new SSMClient(AWS_CONFIGURATION)) {}

  async getParams<T>(parameter_name: string, with_decryption = false): Promise<T> {
    const input: GetParameterRequest = { Name: parameter_name, WithDecryption: with_decryption };

    const command = new GetParameterCommand(input);

    const response = await this.client.send(command);

    const value = JSON.parse(response.Parameter.Value);

    return value as T;
  }
}
