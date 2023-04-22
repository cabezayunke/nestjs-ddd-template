import { User } from '@context/users/domain/User';
import { UserFinder } from '@context/users/domain/UserFinder';
import { UserRepository } from '@context/users/domain/UserRepository';
import { UserEmail } from '@context/users/domain/value-object/UserEmail';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@shared/domain/Logger';
import { DomainEvent } from '@shared/domain/events/DomainEvent';
import { DomainEventPublisher } from '@shared/domain/events/DomainEventPublisher';
import { Handler } from '../Handler';
import { CreateUserCommand } from './CreateUserCommand';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  extends Handler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly userFinder: UserFinder;

  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: DomainEventPublisher,
    private readonly logger: Logger,
  ) {
    super();
    this.userFinder = new UserFinder(repository);
  }

  async execute(command: CreateUserCommand): Promise<void> {
    this.logger.info('CreateUserCommand', {
      command,
      ...this.getRequestContextData(),
    });
    await this.userFinder.findAndThrowByEmail(UserEmail.of(command.email));

    const user = User.create(command);
    await this.repository.save(user);

    const events = user.getUncommittedEvents() as DomainEvent[];
    this.publisher.publish(events.map(e => ({ ...e, ...this.getRequestContextData() })));
  }
}
