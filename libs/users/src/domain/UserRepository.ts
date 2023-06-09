import { Criteria } from '@shared/domain/criteria/Criteria';
import { Repository } from '@shared/domain/data/Repository';
import { User } from './User';
import { UserId } from './value-object/UserId';

export abstract class UserRepository implements Repository<UserId, User> {
  abstract find(criteria: Criteria): Promise<User[]>;

  abstract remove(user: UserId): Promise<void>;

  abstract save(user: User): Promise<void>;
}
