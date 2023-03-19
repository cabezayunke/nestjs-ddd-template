import { UserCreatedDomainEvent } from '@context/users/domain/event/UserCreatedDomainEvent';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@shared/domain/Logger';

@Injectable()
export class UserCounterSubscriber {
  constructor(private readonly logger: Logger) {}

  // @OnEvents(['UserCreatedDomainEvent'])
  @OnEvent('UserCreatedDomainEvent')
  handleEvent(event: UserCreatedDomainEvent): void {
    this.logger.info('UserCreatedDomainEvent received', event);
    console.log('UserCreatedDomainEvent received', event);
  }
}
