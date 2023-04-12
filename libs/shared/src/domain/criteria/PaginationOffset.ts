import { NumberValueObject } from "../value-object/primitives/NumberValueObject";

export class PaginationOffset extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}