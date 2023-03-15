import { InvalidArgumentError } from '../../../src/domain/errors/InvalidArgumentError';
import { Email } from '../../../src/domain/value-object/Email';

describe('Email value object', () => {
  test.each(['invalid', 'invalid.com', 'invalid@yes'])(
    'should throw error for invalid input [%s]',
    (value: string) => {
      expect(() => Email.of(value)).toThrow(InvalidArgumentError);
    },
  );
  test.each([
    'thisisvalid@ohyes.com',
    'Thisisvalid@ohyes.com',
    'THISISALSOVALID@ohyes.com',
    'THISISALSOVALID@LALALA.COM',
  ])('should create email for valid data [%s]', (value: string) => {
    const email = Email.of(value);
    expect(email.value).toEqual(value.toLowerCase());
  });
});
