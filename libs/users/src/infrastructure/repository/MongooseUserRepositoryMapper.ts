import { User } from '@context/users/domain/User';
import { UserEmail } from '@context/users/domain/value-object/UserEmail';
import { UserId } from '@context/users/domain/value-object/UserId';
import { UserName } from '@context/users/domain/value-object/UserName';
import { UserDocument, UserModel } from './UserModel';

export class MongooseUserRepositoryMapper {
  static fromDomain(user: User): UserDocument {
    const entity = new UserModel();
    entity.id = user.id.value;
    entity.email = user.email.value;
    entity.name = user.name?.value;
    return entity;
  }

  static toDomain(userDocument: UserDocument): User {
    return new User(
      UserId.of(userDocument.id),
      UserEmail.of(userDocument.email),
      userDocument.name ? UserName.of(userDocument.name) : undefined,
    );
  }
}
