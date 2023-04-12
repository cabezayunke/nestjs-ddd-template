import { StringValueObject } from "../value-object/primitives/StringValueObject";

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
