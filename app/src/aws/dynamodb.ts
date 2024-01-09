import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DeleteCommandInput,
  DeleteCommandOutput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { CONFIGURATION } from '../constants/configuration';

export class DynamoDB {
  private client: DynamoDBDocumentClient;

  constructor(
    protected table: string,
    region: string = CONFIGURATION.REGION
  ) {
    this.client = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
  }

  protected put(input: Omit<PutCommandInput, 'TableName'>): Promise<PutCommandOutput> {
    const command = new PutCommand({ TableName: this.table, ...input });

    return this.client.send(command);
  }

  protected get(input: Omit<GetCommandInput, 'TableName'>): Promise<GetCommandOutput> {
    const command = new GetCommand({ TableName: this.table, ...input });

    return this.client.send(command);
  }

  protected scan(input: Omit<ScanCommandInput, 'TableName'>): Promise<ScanCommandOutput> {
    const command = new ScanCommand({ TableName: this.table, ...input });

    return this.client.send(command);
  }

  protected query(input: Omit<QueryCommandInput, 'TableName'>): Promise<QueryCommandOutput> {
    const command = new QueryCommand({ TableName: this.table, ...input });

    return this.client.send(command);
  }

  protected delete(input: Omit<DeleteCommandInput, 'TableName'>): Promise<DeleteCommandOutput> {
    const command = new DeleteCommand({ TableName: this.table, ...input });

    return this.client.send(command);
  }
}
