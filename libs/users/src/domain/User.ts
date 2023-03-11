import { AggregateRoot } from '@shared/domain/AggregateRoot';

export class User extends AggregateRoot {
  toPrimitives(): Record<string, unknown> {
    throw new Error('Method not implemented.');
  }
}
