import { pick, pickAs } from '@shared/domain/utils/pick';

describe('pick utils', () => {
  test('should pick desired props', () => {
    // arrange
    const data = { id: 1, email: 'email1' };

    // act
    const result = pick(data, ['id']);

    // assert
    expect(result).toStrictEqual({ id: 1 });
  });

  test('should pick desired props even if not sorted', () => {
    // arrange
    const data = { id: 1, email: 'email1', createdAt: new Date() };

    // act
    const result = pick(data, ['email', 'id']);

    // assert
    expect(result).toStrictEqual({ id: 1, email: 'email1' });
  });

  test('should not pick props that do nto exist', () => {
    // arrange
    const data = [
      { id: 1, email: 'email1' },
      { id: 2, email: 2 },
    ];

    // act
    const result = pick(data, ['invalid']);

    // assert
    expect(result).toStrictEqual({});
  });

  test('should pick desired props renamed', () => {
    // arrange
    const data = { id: 1, email: 'email1', createdAt: new Date() };

    // act
    const result = pickAs(data, ['id', 'email'], ['user_id', 'user_email']);

    // assert
    expect(result).toStrictEqual({ user_id: 1, user_email: 'email1' });
  });

  test('should throw error when picking props and renaming them, if a renamed key is missing', () => {
    // arrange
    const data = { id: 1, email: 'email1', createdAt: new Date() };

    // act & assert
    expect(() => pickAs(data, ['id', 'email'], ['user_id'])).toThrow(
      'Set the new names for all keys please',
    );
  });

  test('should pick desired props and rename them, even if not sorted', () => {
    // arrange
    const data = { id: 1, email: 'email1', createdAt: new Date() };

    // act
    const result = pickAs(data, ['email', 'id'], ['myEmail', 'myId']);

    // assert
    expect(result).toStrictEqual({ myId: 1, myEmail: 'email1' });
  });
});
