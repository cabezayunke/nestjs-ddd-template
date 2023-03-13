import { UserAlreadyExists } from '@context/users/domain/error/UserAlreadyExists';
import { User } from '@context/users/domain/User';
import { UserRepository } from '@context/users/domain/UserRepository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './CreateUserCommand';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  private async checkIfUserExists(email: string): Promise<void> {
    const existingUser = await this.repository.find({ email });
    if (existingUser.length) {
      throw new UserAlreadyExists();
    }
  }

  async execute(command: CreateUserCommand): Promise<void> {
    await this.checkIfUserExists(command.email);

    const user = User.create(command);
    await this.repository.save(user);
    user.commit();
  }
}
