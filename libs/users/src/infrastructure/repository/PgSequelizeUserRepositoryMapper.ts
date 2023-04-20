import { User } from '@context/users/domain/User';
import { UserEmail } from '@context/users/domain/value-object/UserEmail';
import { UserId } from '@context/users/domain/value-object/UserId';
import { UserName } from '@context/users/domain/value-object/UserName';
import { User as SequelizeUser } from './SequelizeUserModel';

export class PgSequelizeUserRepositoryMapper {
  static fromDomain(user: User): SequelizeUser {
    return SequelizeUser.build(user.toPrimitives());
  }

  static toDomain(user: SequelizeUser): User {
    return new User(
      UserId.of(user.id),
      UserEmail.of(user.email),
      user.name ? UserName.of(user.name) : undefined,
    );
  }
}
