import { StringValueObject } from '../../value-object/primitives/StringValueObject';

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
