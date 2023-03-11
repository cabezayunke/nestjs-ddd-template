import { DomainEvent } from './DomainEvent';

export interface EventSubscriber {
  on(event: DomainEvent): void;
}
