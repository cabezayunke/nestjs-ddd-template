import { DomainEvent, DomainEventData } from '@shared/domain/events/DomainEvent';

export interface UserCreatedDomainEventData extends DomainEventData {
  userEmail: string;
}

export class UserCreatedDomainEvent extends DomainEvent {
  public readonly userEmail: string;

  constructor(data: UserCreatedDomainEventData) {
    const { id, eventId, occurredOn, userEmail } = data;
    super(UserCreatedDomainEvent.name, id, eventId, occurredOn);
    this.userEmail = userEmail;
  }
}
