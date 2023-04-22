import { InMemoryUserQueryExecutor } from '@context/users/infrastructure/queries/InMemoryUserQueryExecutor';
import { UserObjectMother } from '../../UserObjectMother';
import { runUserQueryExecutorTests } from './UserQueryExecutorTest';

describe('InMemoryUserQueryExecutor', () => {
  runUserQueryExecutorTests(
    (users: Record<string, any>[]) => new InMemoryUserQueryExecutor(users),
    [
      UserObjectMother.fullUserInput(),
      UserObjectMother.fullUserInput(),
      UserObjectMother.fullUserInput(),
      UserObjectMother.fullUserInput(),
    ],
  );
});
