import { ConnectionManager } from '@shared/domain/data/ConnectionManager';
import { MongooseConnectionManager } from '@shared/infrastructure/data/MongooseConnectionManager';
import { PrettyWinstonLogger } from '@shared/infrastructure/logger/PrettyWinstonLogger';

let db: ConnectionManager;

export const connectMongooseTestDb = async (): Promise<void> => {
  db = new MongooseConnectionManager(
    { uri: 'mongodb://localhost:27017/test', debug: true },
    new PrettyWinstonLogger(),
  );
  await db.connect();
};
export const disconnectMongooseTestDb = async (): Promise<void> => {
  if (db) {
    await db.disconnect();
  }
};
