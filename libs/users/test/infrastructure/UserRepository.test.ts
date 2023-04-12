import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { InMemoryUserRepository } from '@context/users/infrastructure/repository/InMemoryUserRepository';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { RandomObjectMother } from '../../../shared/test/RandomObjectMother';
import { UserObjectMother } from '../UserObjectMother';

export const runUserRepositoryTests = (
  UserRepository: new (data?: Record<string, unknown>) => UserRepository,
): void => {
  describe('Get users', () => {
    test.each([{ id: RandomObjectMother.uuid() }, { email: RandomObjectMother.email() }])(
      'should retrieve existnig user by %s',
      async data => {
        // arrange
        const user = UserObjectMother.fullUser(data) as User;
        const repository = new UserRepository({ [user.id.value]: user });

        // act
        const result = await repository.find(Criteria.equal('id', user.id.value));

        // assert
        expect(result[0]?.email.value).toEqual(user.email.value);
        expect(result[0]?.id.value).toEqual(user.id.value);
      },
    );

    test.each([
      Criteria.equal('id', RandomObjectMother.uuid()),
      Criteria.equal('email', RandomObjectMother.email()),
    ])('should return empty array if user not found', async (criteria: Criteria) => {
      // arrange
      const repository = new UserRepository();

      // act
      const result = await repository.find(criteria);

      // assert
      expect(result).toStrictEqual([]);
    });

    test('should get all users for empty criteria', async () => {
      // arrange
      const user1 = UserObjectMother.fullUser({ id: RandomObjectMother.uuid() }) as User;
      const user2 = UserObjectMother.fullUser({ email: RandomObjectMother.email() }) as User;
      const repository = new UserRepository({ 
        [user1.id.value]: user1,
        [user2.id.value]: user2,
       });

      // act
      const result = await repository.find(Criteria.empty());

      // assert
      expect(result.length).toEqual(2);
    });
  });
};

describe('InMemoryUserRepositoryTest', () => {
  runUserRepositoryTests(InMemoryUserRepository);
});
