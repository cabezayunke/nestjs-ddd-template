import { DomainEvent } from '../../src/domain/events/DomainEvent';

export class DummyEvent extends DomainEvent {
  static eventName = 'dummy:event';

  constructor(id: string) {
    super(DummyEvent.eventName, id);
  }

  toPrimitives(): unknown {
    throw new Error('Method not implemented.');
  }
}
