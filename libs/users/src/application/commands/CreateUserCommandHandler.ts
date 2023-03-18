import { User } from '@context/users/domain/User';
import { UserFinder } from '@context/users/domain/UserFinder';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserEmail } from '@context/users/domain/value-object/UserEmail';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './CreateUserCommand';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly userFinder: UserFinder;

  constructor(private readonly repository: UserRepository) {
    this.userFinder = new UserFinder(repository);
  }

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userFinder.findAndThrowByEmail(UserEmail.of(command.email));

    const user = User.create(command);
    await this.repository.save(user);
    user.commit();
  }
}
