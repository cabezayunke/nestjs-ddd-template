import { User } from '@context/users/domain/User';
import { UserEmail } from '@context/users/domain/value-object/UserEmail';
import { UserId } from '@context/users/domain/value-object/UserId';
import { UserName } from '@context/users/domain/value-object/UserName';
import { UserEntity } from './UserEntity';

export class CockroachUserRepositoryMapper {
  static fromDomain(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id.value;
    entity.name = user.name?.value;
    entity.email = user.email.value;
    return entity;
  }

  static toDomain(user: UserEntity): User {
    return new User(
      UserId.of(user.id),
      UserEmail.of(user.email),
      user.name ? UserName.of(user.name) : undefined,
    );
  }
}
