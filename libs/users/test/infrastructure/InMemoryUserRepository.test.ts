import { InMemoryUserRepository } from '@context/users/infrastructure/repository/InMemoryUserRepository';
import { runUserRepositoryTests } from './UserRepositoryTest';

describe('InMemoryUserRepositoryTest', () => {
  runUserRepositoryTests(new InMemoryUserRepository());
});
