import { Uuid } from '../value-object/Uuid';

export interface DomainEventData {
  eventName: string;
  aggregateId: string;
  eventId?: string;
  occurredOn?: Date;
  // FIXME: this should be mandatory at some point
  requestId?: string;
}

export abstract class DomainEvent {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly requestId?: string;

  constructor(data: DomainEventData) {
    this.eventName = data.eventName;
    this.aggregateId = data.aggregateId;
    this.eventId = data?.eventId || Uuid.random().value;
    this.occurredOn = data?.occurredOn || new Date();
    this.requestId = data?.requestId;
  }
}
