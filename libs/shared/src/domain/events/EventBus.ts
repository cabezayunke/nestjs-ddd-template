import { DomainEvent } from './DomainEvent';
import { EventSubscriber } from './EventSubscriber';

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscriber(events: Array<string>, subscriber: EventSubscriber): void;
}
