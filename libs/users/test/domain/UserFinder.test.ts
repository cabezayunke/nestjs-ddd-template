import { User } from '@context/users/domain/User';
import { UserFinder } from '@context/users/domain/UserFinder';
import { UserId } from '@context/users/domain/value-object/UserId';
import { InMemoryUserRepository } from '@context/users/infrastructure/repository/InMemoryUserRepository';
import { UserObjectMother } from '../UserObjectMother';

describe('UserFinder', () => {
  const arrange = (users: User[] = []): UserFinder => {
    const intialData = users.reduce((acc, user) => {
      acc = { ...acc, [user.id.value]: user };
      return acc;
    }, {});

    const repository = new InMemoryUserRepository(intialData);
    return new UserFinder(repository);
  };

  test('should throw error in findAndThrow for existing user', async () => {
    // arrange
    expect.assertions(1);
    const user = UserObjectMother.fullUser();
    const finder = arrange([user]);

    // act
    try {
      await finder.findAndThrowByEmail(user.email);
    } catch (error) {
      // assert
      expect(error.constructor.name).toEqual('UserAlreadyExists');
    }
  });

  test('should not throw error in findAndThrow if user not found', async () => {
    // arrange
    const user = UserObjectMother.fullUser();
    const finder = arrange();

    // act
    await finder.findAndThrowByEmail(user.email);

    // assert
    // the lack of an error here is our assertion
  });

  test('should throw UserNotFound in findOrThrow', async () => {
    // arrange
    expect.assertions(1);
    const finder = arrange();

    // act
    try {
      await finder.findOrThrowById(UserId.random());
    } catch (error) {
      // assert
      expect(error.constructor.name).toEqual('UserNotFound');
    }
  });

  test('should return user for findOrThrow', async () => {
    // arrange
    const user = UserObjectMother.fullUser();
    const finder = arrange([user]);

    // act
    const result = await finder.findOrThrowById(user.id);

    // assert
    expect(result.toPrimitives()).toStrictEqual(user.toPrimitives());
  });
});
