import { Criteria } from "@shared/domain/criteria/Criteria";
import { Order } from "@shared/domain/criteria/Order";
import { Pagination } from "@shared/domain/criteria/Pagination";
import { Operator } from "@shared/domain/criteria/filters/FilterOperator";
import { SingleFilter } from "@shared/domain/criteria/filters/SingleFilter";

describe('Criteria', () => {
  const filter = SingleFilter.fromPrimitives({ field: 'username', operator: Operator.EQUAL, value: 'yunke' });

  test('should create valid criteria object with filter', () => {
    // arrange
    
    // act
    const criteria = new Criteria({ filter });

    // assert
    expect(criteria.filter).toStrictEqual(filter);
  });
  
  test('should create valid criteria object with filter and order', () => {
    // arrange
    const order = Order.asc("id");
    
    // act
    const criteria = new Criteria({ filter, order });

    // assert
    expect(criteria.order).toStrictEqual(order);
  });

  test('should create valid criteria object with filter and pagination', () => {
    // arrange
    const pagination = Pagination.default();

    // act
    const criteria = new Criteria({ filter, pagination });

    // assert
    expect(criteria.pagination).toStrictEqual(pagination);
  });

  test('should create valid full criteria object', () => {
    // arrange
    const order = Order.asc("id");
    const pagination = Pagination.default();

    // act
    const criteria = new Criteria({ filter, order, pagination });

    // assert
    expect(criteria.hasFilter()).toBeTruthy();
    expect(criteria.hasOrder()).toBeTruthy();
    expect(criteria.hasPagination()).toBeTruthy();
  });

});