import { MongooseUserRepository } from '@context/users/infrastructure/repository/MongooseUserRepository';
import {
  connectMongooseTestDb,
  disconnectMongooseTestDb,
} from '../../../shared/test/setup/setupMongooseTestDb';
import { runUserRepositoryTests } from './UserRepositoryTest';

describe('MongooseUserRepositoryTest', () => {
  beforeAll(async () => {
    await connectMongooseTestDb();
  });

  afterAll(async () => {
    await disconnectMongooseTestDb();
  });

  describe('run after setup', () => {
    runUserRepositoryTests(new MongooseUserRepository());
  });
});
