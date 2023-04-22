import { CockroachUserRepository } from '@context/users/infrastructure/repository/CockroachUserRepository';
import {
  connectTypeORMTestDb,
  disconnectTypeORMTestDb,
  getUserTypeORMRepository,
} from '../../../../shared/test/setup/setupTypeORMTestDb';
import { runUserRepositoryTests } from './UserRepositoryTest';

describe('CockroachUserRepository', () => {
  beforeAll(async () => {
    await connectTypeORMTestDb({
      host: 'localhost',
      port: 26257,
      user: 'root',
      database: 'defaultdb',
    });
  });

  afterAll(async () => {
    await disconnectTypeORMTestDb();
  });

  runUserRepositoryTests(() => new CockroachUserRepository(getUserTypeORMRepository()));
});
