import { UserNotFound } from './error/UserNotFound';
import { User } from './User';
import { UserRepository } from './UserRepository';
import { UserId } from './value-object/UserId';

export class UserFinder {
  constructor(private readonly UserRepository: UserRepository) {}

  async find(userId: UserId): Promise<User> {
    const found = await this.UserRepository.find({ id: userId.value });

    const isArrayResult = Array.isArray(found);
    if (!found || (isArrayResult && !found.length)) {
      throw new UserNotFound();
    }

    return (isArrayResult ? found[0] : found) as User;
  }
}
