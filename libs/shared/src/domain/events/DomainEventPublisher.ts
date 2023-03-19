import { DomainEvent } from './DomainEvent';

export abstract class DomainEventPublisher {
  abstract publish(events: Array<DomainEvent>): Promise<void>;
}
