import { UserCreatedDomainEvent } from '@context/users/domain/event/UserCreatedDomainEvent';
import { Injectable } from '@nestjs/common';
import { OnEvents } from '@shared/infrastructure/events/OnEventsDecorator';
import { Logger } from '@utils/logger/domain/Logger';

@Injectable()
export class UserSingleEventSubscriber {
  constructor(private readonly logger: Logger) {}

  @OnEvents(['UserCreatedDomainEvent'])
  handleEvents(event: UserCreatedDomainEvent): void {
    this.logger.info('UserCreatedDomainEvent received', event);

    // subscribers need their own error handling
    // this execution is out of the web context
    // the request will succeed, and this will be thrown asynchronously and not handled
    // throw new Error('event handler error');
  }
}
