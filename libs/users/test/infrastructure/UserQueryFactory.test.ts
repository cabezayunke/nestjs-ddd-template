import { GetUserByEmailQuery } from '@context/users/application/queries/GetUserByEmailQuery';
import { UserQueryFactory } from '@context/users/application/queries/UserQueryFactory';
import { User } from '@context/users/domain/User';
import { InMemoryUserQueryFactory } from '@context/users/infrastructure/repository/InMemoryUserQueryFactory';
import { RandomObjectMother } from '../../../shared/test/RandomObjectMother';
import { UserObjectMother } from '../UserObjectMother';

export const runUserQueryFactoryTests = (
  UserQueryFactory: new (data?: Record<string, unknown>) => UserQueryFactory,
): void => {
  describe('Get user by email', () => {
    beforeAll(() => {
      jest.restoreAllMocks();
    });

    test('should retrieve existnig user by email', async () => {
      // arrange
      const email = RandomObjectMother.email();
      const user = UserObjectMother.fullUser({ email }) as User;

      const queries = new UserQueryFactory({ [user.id.value]: user.toPrimitives() });

      // act
      const result = await queries.findUserByEmail(new GetUserByEmailQuery(email));

      // assert
      expect(result.email).toEqual(email);

      // mock.mockRestore();
    });

    test('should throw error if user not found', async () => {
      // arrange
      const email = RandomObjectMother.email();
      const queries = new UserQueryFactory();

      // act & assert
      expect.assertions(1);
      try {
        await queries.findUserByEmail(new GetUserByEmailQuery(email));
      } catch (error) {
        expect(error.constructor.name).toEqual('UserNotFound');
      }
    });
  });
};

describe('InMemoryUserQueryFactoryTest', () => {
  runUserQueryFactoryTests(InMemoryUserQueryFactory);
});
