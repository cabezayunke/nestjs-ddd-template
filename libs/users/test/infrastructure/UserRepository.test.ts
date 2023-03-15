import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { InMemoryUserRepository } from '@context/users/infrastructure/repository/InMemoryUserRepository';
import { RandomObjectMother } from '../../../shared/test/RandomObjectMother';
import { UserObjectMother } from '../UserObjectMother';

export const runUserRepositoryTests = (repository: UserRepository): void => {
  describe('Get users', () => {
    test.each([{ id: RandomObjectMother.uuid() }, { email: RandomObjectMother.email() }])(
      'should retrieve existnig user by %s',
      async data => {
        // arrange
        const user = UserObjectMother.fullUser(data) as User;
        await repository.save(user);

        // act
        const result = await repository.find(data);

        // assert
        expect(result[0]?.email.value).toEqual(user.email.value);
        expect(result[0]?.id.value).toEqual(user.id.value);
      },
    );

    test.each([
      {},
      { id: RandomObjectMother.uuid() },
      { email: RandomObjectMother.email() },
    ])('should return empty array if user not found', async data => {
      // arrange

      // act
      const result = await repository.find(data);

      // assert
      expect(result).toStrictEqual([]);
    });
  });
};

describe('InMemoryUserRepositoryTest', () => {
  runUserRepositoryTests(new InMemoryUserRepository());
});
