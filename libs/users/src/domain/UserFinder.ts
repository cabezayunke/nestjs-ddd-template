import { UserAlreadyExists } from './error/UserAlreadyExists';
import { UserNotFound } from './error/UserNotFound';
import { User } from './User';
import { UserRepository } from './UserRepository';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';

export class UserFinder {
  constructor(private readonly repository: UserRepository) {}

  async findOrThrowById(userId: UserId): Promise<User> {
    const found = await this.repository.find({ id: userId.value });

    if (!found?.length) {
      throw new UserNotFound();
    }

    return found[0] as User;
  }

  async findAndThrowByEmail(email: UserEmail): Promise<void> {
    const found = await this.repository.find({ email: email.value });

    if (found?.length) {
      throw new UserAlreadyExists();
    }
  }
}
