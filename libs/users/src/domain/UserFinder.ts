import { Criteria } from '@shared/domain/criteria/Criteria';
import { User } from './User';
import { UserRepository } from './UserRepository';
import { UserAlreadyExists } from './error/UserAlreadyExists';
import { UserNotFound } from './error/UserNotFound';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';

export class UserFinder {
  constructor(private readonly repository: UserRepository) {}

  async findOrThrowById(userId: UserId): Promise<User> {
    const idCriteria = Criteria.equal('id', userId.value);
    const found = await this.repository.find(idCriteria);

    if (!found?.length) {
      throw new UserNotFound();
    }

    return found[0] as User;
  }

  async findAndThrowByEmail(email: UserEmail): Promise<void> {
    const emailCriteria = Criteria.equal('email', email.value);
    const found = await this.repository.find(emailCriteria);

    if (found?.length) {
      throw new UserAlreadyExists();
    }
  }
}
