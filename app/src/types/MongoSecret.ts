export type MongoSecret = {
  username: string;

  password: string;
};

export type MongoParams = {
  host: string;

  database: string;

  protocol: string;

  options?: Record<string, string>;
};
