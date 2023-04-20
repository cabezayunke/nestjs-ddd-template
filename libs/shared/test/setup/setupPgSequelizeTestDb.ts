import { User as SequelizeUser } from '@context/users/infrastructure/repository/SequelizeUserModel';
import { ConnectionManager } from '@shared/domain/data/ConnectionManager';
import { SequilizePgConnectionManager } from '@shared/infrastructure/data/SequilizePgConnectionManager';
import { PrettyWinstonLogger } from '@shared/infrastructure/logger/PrettyWinstonLogger';

let db: ConnectionManager;

export const connectPgSequelizeTestDb = async (): Promise<void> => {
  db = new SequilizePgConnectionManager(
    {
      host: 'localhost',
      port: 26257,
      database: 'test',
      user: 'root',
      debug: true,
      models: [SequelizeUser],
    },
    new PrettyWinstonLogger(),
  );
  await db.connect();
};
export const disconnectPGSequelizeTestDb = async (): Promise<void> => {
  if (db) {
    await db.disconnect();
  }
};
