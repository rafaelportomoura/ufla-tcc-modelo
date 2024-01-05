export class MongoSecret {
  username: string;

  password: string;

  host: string;

  database: string;

  protocol: string;

  options?: Record<string, string>;
}
