import {
  connectMongooseTestDb,
  disconnectMongooseTestDb,
} from 'libs/shared/test/setup/setupMongooseTestDb';
import { UserObjectMother } from '../../UserObjectMother';

describe('MongooseUserQueryExecutor', () => {
  const data = [
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
  ];

  beforeAll(async () => {
    await connectMongooseTestDb();
  });

  afterAll(async () => {
    await disconnectMongooseTestDb();
  });

  // beforeAll(async () => {
  //   await connectTypeORMTestDb({
  //     host: 'localhost',
  //     port: 26257,
  //     user: 'root',
  //     database: 'defaultdb',
  //   });
  //   const repository = getUserTypeORMRepository();
  //   await repository.delete({});
  //   await Promise.all(
  //     data.map(u => {
  //       const entity = new UserEntity();
  //       entity.id = u.id as string;
  //       entity.email = u.email;
  //       entity.name = u.name;
  //       return repository.save(entity);
  //     }),
  //   );
  // });

  // afterAll(async () => {
  //   await disconnectTypeORMTestDb();
  // });

  // runUserQueryExecutorTests(
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   (_: Record<string, any>[]) =>
  //     new TypeOrmUserQueryExecutor(getUserTypeORMRepository()),
  //   data,
  // );
});
