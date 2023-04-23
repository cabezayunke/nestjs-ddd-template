import { ConnectionManager } from '@shared/domain/data/ConnectionManager';
import { MongooseConnectionManager } from '@shared/infrastructure/data/MongooseConnectionManager';
import { NoOpLogger } from '@utils/logger/infrastructure/NoOpLogger';
import { Mongoose } from 'mongoose';

let db: ConnectionManager<Mongoose>;

export const connectMongooseTestDb = async (): Promise<void> => {
  db = new MongooseConnectionManager(
    { uri: 'mongodb://localhost:27017/test', debug: false },
    new NoOpLogger(),
  );
  await db.connect();
};
export const disconnectMongooseTestDb = async (): Promise<void> => {
  if (db) {
    await db.disconnect();
  }
};
