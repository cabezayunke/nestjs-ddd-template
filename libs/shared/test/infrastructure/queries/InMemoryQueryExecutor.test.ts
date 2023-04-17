import { Criteria } from "@shared/domain/criteria/Criteria";
import { Order } from "@shared/domain/criteria/order/Order";
import { Pagination } from "@shared/domain/criteria/pagination/Pagination";
import { InMemoryQueryExecutor } from "@shared/infrastructure/queries/InMemoryQueryExecutor";

describe('InMemoryQueryExecutor', () => {

  const item1 = {
    id: 'myId',
    email: 'someEmailHere@gmail.com'
  };
  const item2 = {
    id: 'myId2',
    email: 'whatever@gmail.com'
  };
  const item3 = {
    id: 'anotherId',
    email: 'lalala@gmail.com'
  }
  
  const data = [item1, item2, item3];
  const executor = new InMemoryQueryExecutor(data);
  
  type CustomResponse = typeof item1;

  test.each([
    { operator: 'EQUAL', criteria: Criteria.equal('id', 'myId'), expectedResult: [item1] },
    { operator: 'NOT_EQUAL', criteria: Criteria.notEqual('id', 'myId'), expectedResult: [item2, item3] },
    { operator: 'CONTAINS', criteria: Criteria.contains('id', 'my'), expectedResult: [item1, item2] },
    { operator: 'NOT_CONTAINS', criteria: Criteria.notContains('id', 'my'), expectedResult: [item3] },
    { operator: 'IN', criteria: Criteria.in('id', ['myId', 'myId2']), expectedResult: [item1, item2] },
    { operator: 'NOT_IN', criteria: Criteria.notIn('id',  ['myId', 'myId2']), expectedResult: [item3] },
  ])('should handle single $operator criteria with results', ({ criteria, expectedResult }) => {
    // arrange
    // act
    const result = executor.execute<CustomResponse>(criteria) as CustomResponse[];

    // assert
    expect(result).toStrictEqual(expectedResult);
  });

  test.each([
    { operator: 'EQUAL', criteria: Criteria.equal('id', 'invalidId') },
    // { operator: 'NOT_EQUAL', criteria: Criteria.notEqual('id', 'myId'), expectedResult: [item2, item3] },
    { operator: 'CONTAINS', criteria: Criteria.contains('id', 'invalid') },
    { operator: 'NOT_CONTAINS', criteria: Criteria.notContains('email', 'gmail') },
    { operator: 'IN', criteria: Criteria.in('id', ['invalid1', 'invalid2']) },
    { operator: 'NOT_IN', criteria: Criteria.notIn('id',  ['myId', 'myId2', 'anotherId']) },
  ])('should handle single $operator criteria with no results', ({ criteria }) => {
    // arrange

    // act
    const result = executor.execute(criteria) as CustomResponse[];

    // assert
    expect(result).toHaveLength(0);
  });

  describe.skip('should handle GT and LT', () => {
    
  });

  describe('Pagination', () => {
    test.each([
      { 
        criteria: new Criteria({ pagination: Pagination.fromValues(2, 0) }),
        expectedResult: [item1, item2]
      },
      { 
        criteria: new Criteria({ pagination: Pagination.fromValues(undefined, 0) }),
        expectedResult: [item1, item2, item3]
      },
      { 
        criteria: new Criteria({ pagination: Pagination.fromValues(1, 0) }),
        expectedResult: [item1]
      },
      { 
        criteria: new Criteria({ pagination: Pagination.fromValues(2, 1) }),
        expectedResult: [item2, item3]
      },
      { 
        criteria: new Criteria({ pagination: Pagination.fromValues(1, 2) }),
        expectedResult: [item3]
      }
    ])('should get paginated results for limit $criteria.pagination.limit.value, offset $criteria.pagination.offset.value', ({ criteria, expectedResult }) => {
      // arrange
      // act
      const result = executor.execute<CustomResponse>(criteria) as CustomResponse[];

      // assert
      expect(result).toStrictEqual(expectedResult);
    });
  });

  test.each([
    { 
      criteria: new Criteria({ order: Order.asc('email') }),
      expectedResult: [item3, item1, item2]
    },
    { 
      criteria: new Criteria({ order: Order.desc('email') }),
      expectedResult: [item2, item1, item3]
    },
  ])('should order results by ', ({ criteria, expectedResult }) => {
      // arrange
      // act
      const result = executor.execute<CustomResponse>(criteria) as CustomResponse[];

      // assert
      expect(result).toStrictEqual(expectedResult);
  });

});