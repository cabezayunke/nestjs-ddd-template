import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { Criteria } from '@shared/domain/criteria/Criteria';
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
      // act
      const result = await repository.find(criteria);

      // assert
      expect(result).toStrictEqual([]);
    });

    test('should get all users for empty criteria', async () => {
      // arrange
      const user1 = UserObjectMother.fullUser({ id: RandomObjectMother.uuid() }) as User;
      const user2 = UserObjectMother.fullUser({
        email: RandomObjectMother.email(),
      }) as User;
      await Promise.all([repository.save(user1), repository.save(user2)]);

      // act
      const result = await repository.find(Criteria.empty());

      // assert
      expect(result.find(u => u.id.value === user1.id.value)).toBeTruthy();
      expect(result.find(u => u.id.value === user2.id.value)).toBeTruthy();
    });
  });
};
