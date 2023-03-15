import { InvalidArgumentError } from '../errors/InvalidArgumentError';
import { StringValueObject } from './primitives/StringValueObject';

const emailRegex =
  // eslint-disable-next-line max-len
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export class Email extends StringValueObject {
  protected constructor(value: string) {
    super(value);
  }

  static of(value: string): Email {
    const email = value?.trim().toLowerCase();
    if (!emailRegex.test(email)) {
      throw new InvalidArgumentError(
        `<${this.name}> does not allow the value <${value}>`,
      );
    }
    return new Email(email);
  }
}
