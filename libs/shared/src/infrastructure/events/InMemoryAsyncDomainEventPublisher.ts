import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '../../../../logger/src/domain/Logger';
import { DomainEvent } from '../../domain/events/DomainEvent';
import { DomainEventPublisher } from '../../domain/events/DomainEventPublisher';

@Injectable()
export class InMemoryAsyncDomainEventPublisher implements DomainEventPublisher {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger,
  ) {}

  async publish(events: DomainEvent[]): Promise<void> {
    this.logger.info('[InMemoryAsyncEventBus] publishing events', events);
    events.forEach(e => this.eventEmitter.emit(e.eventName, e));
  }
}
