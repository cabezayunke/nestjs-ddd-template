import { NumberValueObject } from '../../value-object/primitives/NumberValueObject';

export class PaginationLimit extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
