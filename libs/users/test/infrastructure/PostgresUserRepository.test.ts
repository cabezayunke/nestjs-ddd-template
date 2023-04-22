import { CockroachUserRepository } from '@context/users/infrastructure/repository/CockroachUserRepository';
import {
  connectTypeORMTestDb,
  disconnectTypeORMTestDb,
  getUserTypeORMRepository,
} from '../../../shared/test/setup/setupTypeORMTestDb';
import { runUserRepositoryTests } from './UserRepositoryTest';

describe('PostgresUserRepository', () => {
  beforeAll(async () => {
    await connectTypeORMTestDb({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
    });
  });

  afterAll(async () => {
    await disconnectTypeORMTestDb();
  });

  runUserRepositoryTests(() => new CockroachUserRepository(getUserTypeORMRepository()));
});
