interface MongoDebugConfig {
  debug?: boolean;
}
export interface MongoUri extends MongoDebugConfig {
  uri: string;
}
export interface MongoParams extends MongoDebugConfig {
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
}
