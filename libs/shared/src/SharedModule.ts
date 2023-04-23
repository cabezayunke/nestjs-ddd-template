import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from '@utils/logger/LoggerModule';
import { ServerModule } from '@utils/server/ServerModule';
import { DomainEventPublisher } from './domain/events/DomainEventPublisher';
import { InMemoryAsyncDomainEventPublisher } from './infrastructure/events/InMemoryAsyncDomainEventPublisher';
import { InMemoryQueryExecutor } from './infrastructure/queries/InMemoryQueryExecutor';

@Module({
  imports: [
    LoggerModule,
    ServerModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  providers: [
    { provide: DomainEventPublisher, useClass: InMemoryAsyncDomainEventPublisher },
    InMemoryAsyncDomainEventPublisher,
    InMemoryQueryExecutor,
  ],
  exports: [
    DomainEventPublisher,
    InMemoryAsyncDomainEventPublisher,
    InMemoryQueryExecutor,
  ],
})
export class SharedModule {}
