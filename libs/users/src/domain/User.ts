import { AggregateRoot } from '@nestjs/cqrs';
import { Nullable } from '@shared/domain/types/Nullable';
import { UserDto } from './UserDto';
import { UserCreatedDomainEvent } from './event/UserCreatedDomainEvent';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';
import { UserName } from './value-object/UserName';

export interface CreateUserParams {
  id?: string;
  name?: string;
  email: string;
}

export class User extends AggregateRoot {
  constructor(
    private readonly _id: UserId,
    private readonly _email: UserEmail,
    private readonly _name?: UserName,
  ) {
    super();
  }

  get id(): UserId {
    return this._id;
  }

  get email(): UserEmail {
    return this._email;
  }

  get name(): Nullable<UserName> {
    return this._name;
  }

  static create({ id, name, email }: CreateUserParams): User {
    const user = new User(
      id ? UserId.of(id) : UserId.random(),
      UserEmail.of(email),
      name ? UserName.of(name) : undefined,
    );

    user.apply(
      new UserCreatedDomainEvent({ userId: user.id.value, userEmail: user.email.value }),
    );

    return user;
  }

  toPrimitives(): UserDto {
    return {
      id: this.id?.value,
      email: this.email?.value,
      name: this.name?.value,
    };
  }
}
