import { EventEmitter2 } from '@nestjs/event-emitter';
import { InMemoryAsyncEventBus } from '../../src/infrastructure/events/InMemoryAsyncEventBus';
import { DummyEvent } from '../domain/events/DummyEvent';

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

    const eventBus = new InMemoryAsyncEventBus(emitter, console);

    // act
    eventBus.publish([event]);
  });
});