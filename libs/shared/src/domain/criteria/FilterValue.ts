import { StringValueObject } from "../value-object/primitives/StringValueObject";

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
