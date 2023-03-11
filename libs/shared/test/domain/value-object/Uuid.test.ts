import { InvalidArgumentError } from '../../../src/domain/errors/InvalidArgumentError';
import { Uuid } from '../../../src/domain/value-object/Uuid';

describe('Uuid value object', () => {
  test('should throw error for invalid input', () => {
    expect(() => Uuid.of('invalid')).toThrow(InvalidArgumentError);
  });
  test('should create uuid for valid data', () => {
    const customUuid = '062715c2-afb2-4259-bacb-41d5d3e9f815';
    const uuid = Uuid.of(customUuid);
    expect(uuid.value).toEqual(customUuid);
  });
});
