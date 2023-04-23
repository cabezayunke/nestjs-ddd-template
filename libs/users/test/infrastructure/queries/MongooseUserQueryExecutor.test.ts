import { User } from '@context/users/domain/User';
import { UserEmail } from '@context/users/domain/value-object/UserEmail';
import { UserId } from '@context/users/domain/value-object/UserId';
import { UserName } from '@context/users/domain/value-object/UserName';
import { MongooseUserRepository } from '@context/users/infrastructure/repository/MongooseUserRepository';
import {
  UserDocument,
  UserModel,
} from '@context/users/infrastructure/repository/UserModel';
import { MongooseQueryExecutor } from '@shared/infrastructure/queries/MongooseQueryExecutor';
import {
  connectMongooseTestDb,
  disconnectMongooseTestDb,
} from '../../../../shared/test/setup/setupMongooseTestDb';
import { UserObjectMother } from '../../UserObjectMother';
import { runUserQueryExecutorTests } from './UserQueryExecutorTest';

describe('MongooseUserQueryExecutor', () => {
  const data = [
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
    UserObjectMother.fullUserInput(),
  ];
  const repository = new MongooseUserRepository();

  beforeAll(async () => {
    await connectMongooseTestDb();
    await UserModel.deleteMany({});
    await Promise.all(
      data.map(u =>
        repository.save(
          new User(
            UserId.of(u.id as string),
            UserEmail.of(u.email),
            UserName.of(u.name as string),
          ),
        ),
      ),
    );
  });

  afterAll(async () => {
    await disconnectMongooseTestDb();
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runUserQueryExecutorTests((_: Record<string, any>[]) => {
    return new MongooseQueryExecutor<UserDocument>(UserModel);
  }, data);
});
