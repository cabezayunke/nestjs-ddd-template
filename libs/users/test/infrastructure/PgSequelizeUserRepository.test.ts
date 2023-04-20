import { PgSequelizeUserRepository } from '@context/users/infrastructure/repository/PgSequelizeUserRepository';
import { User as SequelizeUser } from '@context/users/infrastructure/repository/SequelizeUserModel';
import {
  connectPgSequelizeTestDb,
  disconnectPGSequelizeTestDb,
} from '../../../shared/test/setup/setupPgSequelizeTestDb';
import { runUserRepositoryTests } from './UserRepositoryTest';

describe('PgSequelizeUserRepository', () => {
  beforeAll(async () => {
    await connectPgSequelizeTestDb();
    await SequelizeUser.sync({ force: true });
  });

  afterAll(async () => {
    await disconnectPGSequelizeTestDb();
  });

  describe('run after setup', () => {
    runUserRepositoryTests(new PgSequelizeUserRepository());
  });
});
