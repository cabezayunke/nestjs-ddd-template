import { EventEmitter2 } from '@nestjs/event-emitter';
import { NoOpLogger } from '@utils/logger/infrastructure/NoOpLogger';
import { InMemoryAsyncDomainEventPublisher } from '../../src/infrastructure/events/InMemoryAsyncDomainEventPublisher';
import { DummyEvent } from '../DummyEvent';

describe('InMemoryAsyncEventBus', () => {
  it('the subscriber should be called when the event it is subscribed to is published', done => {
    // arrange
    expect.assertions(1);
    const event = new DummyEvent('customId');
    const emitter = new EventEmitter2();
    emitter.addListener(DummyEvent.eventName, (payload: DummyEvent) => {
      // assert
      expect(payload.aggregateId).toEqual('customId');
      done();
    });

    const eventBus = new InMemoryAsyncDomainEventPublisher(emitter, new NoOpLogger());

    // act
    eventBus.publish([event]);
  });
});
