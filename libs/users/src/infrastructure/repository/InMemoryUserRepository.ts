import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserId } from '@context/users/domain/value-object/UserId';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: Record<string, User> = {};

  setInitialData(initialData: User[]): void {
    this.users = initialData.reduce((acc: Record<string, User>, u: User) => {
      return {
        ...acc,
        [u.id.value]: u,
      };
    }, {});
  }

  async find(data: Record<string, unknown>): Promise<User[]> {
    if (data.id) {
      const user = this.users[data?.id as string];
      if (user) {
        return [user];
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
