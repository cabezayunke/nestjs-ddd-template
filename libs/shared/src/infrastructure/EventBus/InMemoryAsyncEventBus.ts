import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '../../domain/events/DomainEvent';
import { EventBus } from '../../domain/events/EventBus';
import { Logger } from '../../domain/Logger';

@Injectable()
export class InMemoryAsyncEventBus implements EventBus {

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger
  ) {
    this.logger.debug('[InMemoryAsyncEventBus] initialised');
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(e => this.eventEmitter.emit(e.eventName, e));
  }

}
