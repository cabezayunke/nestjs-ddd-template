import { FilterType } from "@shared/domain/criteria/filters/Filter";
import { Operator } from "@shared/domain/criteria/filters/FilterOperator";
import { FilterPrimitives } from "@shared/domain/criteria/filters/FilterPrimitives";
import { MultiFilter } from "@shared/domain/criteria/filters/MultiFilter";
import { SingleFilter } from "@shared/domain/criteria/filters/SingleFilter";

describe('Filter', () => {
  const usernameFilterValues = { field: 'username', operator: Operator.EQUAL, value: 'yunke' };
  const emailFilterValues = { field: 'email', operator: Operator.NOT_EQUAL, value: 'yunke@gmail.com' };

  test('should create single filter', () => {
    // arrange
    
    // act
    const filter = SingleFilter.fromPrimitives(usernameFilterValues)

    // assert
    expect(filter.type === FilterType.SINGLE);
  });

  test('should throw error for missing field', () => {
    // arrange
    const { field, ...opAndValue } = usernameFilterValues;
    // act
    // assert
    expect(() => SingleFilter.fromPrimitives(opAndValue as FilterPrimitives)).toThrow('The filter is invalid');
  });

  test('should throw error for missing operator', () => {
    // arrange
    const { operator, ...fieldAndValue } = usernameFilterValues;
    // act
    // assert
    expect(() => SingleFilter.fromPrimitives(fieldAndValue as FilterPrimitives)).toThrow('The filter is invalid');
  });

  test('should throw error for missing value', () => {
    // arrange
    const { value, ...fieldAndOp } = usernameFilterValues;
    // act
    // assert
    expect(() => SingleFilter.fromPrimitives(fieldAndOp as FilterPrimitives)).toThrow('The filter is invalid');
  });

  test('should create and filter', () => {
    // arrange
  
    const filter = MultiFilter.and(
      SingleFilter.fromPrimitives(usernameFilterValues),
      SingleFilter.fromPrimitives(emailFilterValues),
    )

    // assert
    expect(filter.type === FilterType.AND);
  });

  test('should create or filter', () => {
    // arrange
  
    // act
    const filter = MultiFilter.or(
      SingleFilter.fromPrimitives(usernameFilterValues),
      SingleFilter.fromPrimitives(emailFilterValues),
    )

    // assert
    expect(filter.type === FilterType.OR);
  });

  test('should throw error for multifilter with less than 2 filters', () => {
    // arrange
  
    // act

    // assert
    expect(() => MultiFilter.and(SingleFilter.fromPrimitives(usernameFilterValues))).toThrow('You need at least 2 filters');
  });

  test('should create nested and/or filter', () => {
    // arrange
  
    // act
    const filter = MultiFilter.and(
      MultiFilter.or(
        SingleFilter.fromPrimitives(usernameFilterValues),
        SingleFilter.fromPrimitives(emailFilterValues),
      ),
      MultiFilter.or(
        SingleFilter.fromPrimitives(usernameFilterValues),
        SingleFilter.fromPrimitives(emailFilterValues),
      )
    ) as MultiFilter;
   

    // assert
    expect(filter.type === FilterType.AND);
    expect(filter.filters.every(f => f.type === FilterType.OR)).toBeTruthy();
  });
});