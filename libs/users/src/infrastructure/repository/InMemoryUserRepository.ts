import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserId } from '@context/users/domain/value-object/UserId';
import { Injectable } from '@nestjs/common';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { FilterType } from '@shared/domain/criteria/filters/Filter';
import { SingleFilter } from '@shared/domain/criteria/filters/SingleFilter';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: Record<string, User> = {};

  constructor(initialData?: Record<string, User>) {
    this.users = { ...initialData };
  }

  async find(criteria: Criteria): Promise<User[]> {

    if (criteria.isEmpty()) {
      return Object.values(this.users);
    }

    // ignore multi-filter for now
    if (criteria.hasFilter() && criteria.filter?.type === FilterType.SINGLE) {
      const filter = criteria.filter as SingleFilter;

      if (filter.field.toString() === 'id' && filter.operator.isEqual()) {
        const idValue = filter.value.toString();
        const user = idValue && this.users[idValue];
        if (user) {
          return [user];
        }
      }
  
      if (filter.field.toString() === 'email' && filter.operator.isEqual()) {
        const emailValue = filter.value.toString();
        return Object.values(this.users).filter(
          u => emailValue && u.email.value.toLowerCase() === emailValue?.toLowerCase(),
        );
      }

    }    

    return [];
  }

  async remove(user: UserId): Promise<void> {
    delete this.users[user?.value];
  }

  async save(user: User): Promise<void> {
    this.users[user.id.value] = user;
  }
}
