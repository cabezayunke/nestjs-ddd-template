import {
  connectTypeORMTestDb,
  disconnectTypeORMTestDb,
  getUserTypeORMRepository,
} from '../../../../shared/test/setup/setupTypeORMTestDb';

import { TypeOrmUserQueryExecutor } from '@context/users/infrastructure/queries/TypeOrmUserQueryExecutor';
import { UserEntity } from '@context/users/infrastructure/repository/UserEntity';
import { UserObjectMother } from '../../UserObjectMother';
import { runUserQueryExecutorTests } from './UserQueryExecutorTest';

describe('CockroachUserQueryExecutor', () => {
  const data = [
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
  ];

  beforeAll(async () => {
    await connectTypeORMTestDb({
      host: 'localhost',
      port: 26257,
      user: 'root',
      database: 'defaultdb',
    });
    const repository = getUserTypeORMRepository();
    await repository.delete({});
    await Promise.all(
      data.map(u => {
        const entity = new UserEntity();
        entity.id = u.id as string;
        entity.email = u.email;
        entity.name = u.name;
        return repository.save(entity);
      }),
    );
  });

  afterAll(async () => {
    await disconnectTypeORMTestDb();
  });

  runUserQueryExecutorTests(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: Record<string, any>[]) =>
      new TypeOrmUserQueryExecutor(getUserTypeORMRepository()),
    data,
  );
});
