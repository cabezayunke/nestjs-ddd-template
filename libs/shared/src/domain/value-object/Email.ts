import { InvalidArgumentError } from '../errors/InvalidArgumentError';
import { StringValueObject } from './primitives/StringValueObject';

const emailRegex = new RegExp(/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'gm');

export class Email extends StringValueObject {
  protected constructor(value: string) {
    super(value);
  }

  static of(value: string): Email {
    if (!emailRegex.test(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`,
      );
    }
    return new Email(value);
  }
}
