import { DomainEvent } from '../src/domain/events/DomainEvent';

export class DummyEvent extends DomainEvent {
  static eventName = 'dummy:event';

  constructor(aggregateId: string) {
    super({ eventName: DummyEvent.eventName, aggregateId });
  }

  toPrimitives(): unknown {
    throw new Error('Method not implemented.');
  }
}
