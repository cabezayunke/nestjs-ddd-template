import { UserEntity } from '@context/users/infrastructure/repository/UserEntity';
import { ConnectionManager } from '@shared/domain/data/ConnectionManager';
import {
  TypeOrmConnectionManager,
  TypeOrmParams,
} from '@shared/infrastructure/data/TypeOrmConnectionManager';
import { DataSource, EntitySchema, Repository } from 'typeorm';

let db: ConnectionManager<DataSource>;

export const connectTypeORMTestDb = async (
  data: Record<string, string | number>,
): Promise<void> => {
  db = new TypeOrmConnectionManager(
    {
      ...data,
      models: [UserEntity as unknown as EntitySchema],
      sync: true, // this is only the first time to create the tables
      debug: false,
    } as TypeOrmParams,
    // new PrettyWinstonLogger(),
  );
  await db.connect();
};

export const disconnectTypeORMTestDb = async (): Promise<void> => {
  if (db) {
    await db.disconnect();
  }
};

export const getUserTypeORMRepository = (): Repository<UserEntity> =>
  db?.getConnection().getRepository(UserEntity);
