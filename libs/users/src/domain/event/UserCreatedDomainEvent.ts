import { DomainEvent } from '@shared/domain/events/DomainEvent';

export interface UserCreatedDomainEventData {
  userId: string;
  userEmail: string;
}

export class UserCreatedDomainEvent extends DomainEvent {
  public readonly userEmail: string;

  constructor(data: UserCreatedDomainEventData) {
    const { userId, userEmail } = data;
    super({
      eventName: UserCreatedDomainEvent.name,
      aggregateId: userId,
      requestId: 'fill_me_in',
    });
    this.userEmail = userEmail;
    console.log('event created');
  }
}
