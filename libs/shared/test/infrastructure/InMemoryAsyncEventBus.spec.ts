import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventSubscriber } from '../../src/domain/events/EventSubscriber';
import { InMemoryAsyncEventBus } from '../../src/infrastructure/events/InMemoryAsyncEventBus';
import { DummyEvent } from '../domain/events/DummyEvent';

describe('InMemoryAsyncEventBus', () => {
  it('the subscriber should be called when the event it is subscribed to is published', done => {
    // arrange
    expect.assertions(1);
    const event = new DummyEvent('customId');

    class DomainEventSubscriberDummy implements EventSubscriber {
      on(payload: DummyEvent): void {
        // assert
        expect(payload.aggregateId).toEqual('customId');
        done();
      }
    }

    const subscriber = new DomainEventSubscriberDummy();
    const eventBus = new InMemoryAsyncEventBus(new EventEmitter2(), console);
    eventBus.addSubscriber([DummyEvent.eventName], subscriber);

    // act
    eventBus.publish([event]);
  });
});
