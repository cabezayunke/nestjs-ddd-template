import { User } from '@context/users/domain/User';
import { CreateUserInput } from '@context/users/infrastructure/controllers/CreateUserController';
import { RandomObjectMother } from '../../shared/test/RandomObjectMother';

export class UserObjectMother {
  static fullUserInput(): CreateUserInput {
    return {
      email: RandomObjectMother.email(),
      name: RandomObjectMother.username(),
      id: RandomObjectMother.uuid(),
    };
  }

  static fullUser(extra?: Record<string, unknown>): User {
    return User.create({
      email: RandomObjectMother.email(),
      name: RandomObjectMother.username(),
      id: RandomObjectMother.uuid(),
      ...extra,
    });
  }
}
