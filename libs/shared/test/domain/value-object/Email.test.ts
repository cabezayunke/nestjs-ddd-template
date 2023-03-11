import { InvalidArgumentError } from '../../../src/domain/errors/InvalidArgumentError';
import { Email } from '../../../src/domain/value-object/Email';

describe('Email value object', () => {
  test.each(['invalid', 'invalid.com', 'invalid@yes'])(
    'should throw error for invalid input',
    (value: string) => {
      expect(() => Email.of(value)).toThrow(InvalidArgumentError);
    },
  );
  test('should create email for valid data', () => {
    const customEmail = 'thisisvalid@ohyes.com';
    const email = Email.of(customEmail);
    expect(email.value).toEqual(customEmail);
  });
});
