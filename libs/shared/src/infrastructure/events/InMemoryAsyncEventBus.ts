import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventSubscriber } from '@shared/domain/events/EventSubscriber';
import { DomainEvent } from '../../domain/events/DomainEvent';
import { EventBus } from '../../domain/events/EventBus';
import { Logger } from '../../domain/Logger';

@Injectable()
export class InMemoryAsyncEventBus implements EventBus {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger,
  ) {
    this.logger.debug('[InMemoryAsyncEventBus] initialised');
  }

  addSubscriber(eventNames: string[], subscriber: EventSubscriber): void {
    eventNames.forEach(name => this.eventEmitter.addListener(name, subscriber.on));
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(e => this.eventEmitter.emit(e.eventName, e));
  }
}
