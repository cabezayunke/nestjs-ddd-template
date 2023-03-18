import { UserCreatedDomainEvent } from '@context/users/domain/event/UserCreatedDomainEvent';
import { Injectable } from '@nestjs/common';
import { Logger } from '@shared/domain/Logger';
import { OnEvents } from '@shared/infrastructure/events/OnEventsDecorator';

@Injectable()
export class UserCounterSubscriber {
  constructor(private readonly logger: Logger) {}

  @OnEvents(['UserCreatedDomainEvent'])
  handleEvent(event: UserCreatedDomainEvent): void {
    this.logger.debug('UserCreatedDomainEvent received', event);
  }
}
