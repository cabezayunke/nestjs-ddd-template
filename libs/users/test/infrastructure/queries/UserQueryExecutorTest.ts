import { Criteria } from '@shared/domain/criteria/Criteria';
import { Order } from '@shared/domain/criteria/order/Order';
import { Pagination } from '@shared/domain/criteria/pagination/Pagination';
import { QueryExecutor } from '@shared/domain/queries/QueryExecutor';
import {
  sortAsc,
  sortDesc,
} from '@shared/infrastructure/queries/InMemoryPaginationUtils';

type UserOutput = {
  id: string;
  name?: string;
  email: string;
};

export const runUserQueryExecutorTests = (
  createUserQueryExecutor: (users: Record<string, any>[]) => QueryExecutor,
  users: Record<string, any>[],
): void => {
  let executor: QueryExecutor;

  beforeEach(() => {
    executor = createUserQueryExecutor(users);
  });

  describe('GetUserByEmail', () => {
    test('should find user by email', async () => {
      // arrange
      const targetUser = users[0];
      const criteria = Criteria.equal('email', targetUser?.email as string);

      // act
      const result = await executor.execute<UserOutput>(criteria);

      // assert
      expect(result).toStrictEqual([targetUser]);
    });
    test('should not find user by email', async () => {
      // arrange
      const criteria = Criteria.equal('email', 'fake@email.com');

      // act
      const result = await executor.execute<UserOutput>(criteria);

      // assert
      expect(result).toStrictEqual([]);
    });
  });

  describe('GetUsers [paginated]', () => {
    test('should get all users', async () => {
      const criteria = new Criteria({
        pagination: Pagination.fromValues({ limit: 10 }),
      });
      const expectedResult = users.sort(sortAsc('id'));

      // act
      const result = await executor.execute<UserOutput>(criteria);

      // assert
      expect(result.sort(sortAsc('id'))).toStrictEqual(expectedResult);
    });

    test('should get all users in DESC order', async () => {
      const criteria = new Criteria({
        pagination: Pagination.fromValues({ limit: 10 }),
        order: Order.fromValues({ orderBy: 'id', orderType: 'desc' }),
      });
      const expectedResult = users.sort(sortDesc('id'));

      // act
      const result = await executor.execute<UserOutput>(criteria);

      // assert
      expect(result).toStrictEqual(expectedResult);
    });

    test('should get first 2 users in DESC order', async () => {
      const criteria = new Criteria({
        pagination: Pagination.fromValues({ limit: 2 }),
        order: Order.fromValues({ orderBy: 'id', orderType: 'desc' }),
      });
      const expectedResult = users.sort(sortDesc('id')).slice(0, 2);

      // act
      const result = await executor.execute<UserOutput>(criteria);

      // assert
      expect(result).toStrictEqual(expectedResult);
    });

    test('should get 2 users in the middle in ASC order', async () => {
      const criteria = new Criteria({
        pagination: Pagination.fromValues({ limit: 2, offset: 1 }),
        order: Order.fromValues({ orderBy: 'id', orderType: 'asc' }),
      });
      const expectedResult = users.sort(sortAsc('id')).slice(1, 3);

      // act
      const result = await executor.execute<UserOutput>(criteria);

      // assert
      expect(result).toStrictEqual(expectedResult);
    });
  });
};
