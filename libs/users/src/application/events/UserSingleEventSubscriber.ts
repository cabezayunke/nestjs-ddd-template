import { UserCreatedDomainEvent } from '@context/users/domain/event/UserCreatedDomainEvent';
import { Injectable } from '@nestjs/common';
import { Logger } from '@shared/domain/Logger';
import { OnEvents } from '@shared/infrastructure/events/OnEventsDecorator';

@Injectable()
export class UserSingleEventSubscriber {
  constructor(private readonly logger: Logger) {}

  @OnEvents(['UserCreatedDomainEvent'])
  //@OnEvent('UserCreatedDomainEvent')
  handleEvents(event: UserCreatedDomainEvent): void {
    this.logger.info('UserCreatedDomainEvent received', event);
  }
}
