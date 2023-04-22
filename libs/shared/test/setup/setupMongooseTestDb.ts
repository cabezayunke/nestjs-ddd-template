import { ConnectionManager } from '@shared/domain/data/ConnectionManager';
import { MongooseConnectionManager } from '@shared/infrastructure/data/MongooseConnectionManager';
import { PrettyWinstonLogger } from '@shared/infrastructure/logger/PrettyWinstonLogger';
import { Mongoose } from 'mongoose';

let db: ConnectionManager<Mongoose>;

export const connectMongooseTestDb = async (): Promise<void> => {
  db = new MongooseConnectionManager(
    { uri: 'mongodb://localhost:27017/test', debug: false },
    new PrettyWinstonLogger(),
  );
  await db.connect();
};
export const disconnectMongooseTestDb = async (): Promise<void> => {
  if (db) {
    await db.disconnect();
  }
};
