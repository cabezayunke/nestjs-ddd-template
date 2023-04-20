import { User } from '@context/users/domain/User';
import { UserDocument, UserModel } from './MongooseUserModel';

export class MongooseUserRepositoryMapper {
  static fromDomain(user: User): UserDocument {
    const entity = new UserModel();
    entity.id = user.id.value;
    entity.email = user.email.value;
    entity.name = user.name?.value;
    return entity;
  }

  static toDomain(userDocument: UserDocument): User {
    return User.create(userDocument.toObject());
  }
}
