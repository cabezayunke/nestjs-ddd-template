import { InvalidArgumentError } from '../../errors/InvalidArgumentError';
import { Filter, FilterType } from './Filter';
import { FilterField } from './FilterField';
import { FilterOperator, Operator } from './FilterOperator';
import { FilterPrimitives } from './FilterPrimitives';
import { FilterValue } from './FilterValue';

export class SingleFilter {
  readonly type: FilterType;
  readonly field: FilterField;
  readonly operator: FilterOperator;
  readonly value: FilterValue;
  
  constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
    this.type = FilterType.SINGLE;
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  static fromPrimitives(primitiveValue: FilterPrimitives): Filter {
    const { field, operator, value } = primitiveValue;

    if (!field || !operator || !value) {
      throw new InvalidArgumentError(`The filter is invalid`);
    }

    return new SingleFilter(new FilterField(field), FilterOperator.fromValue(operator), new FilterValue(value));
  }

  hasFilter(): boolean {
    return !!this.field && !!this.operator && !!this.value;
  }

  static equal(field: string, value: string) {
    return SingleFilter.fromPrimitives({
      field,
      operator: Operator.EQUAL,
      value
    })
  }

  static notEqual(field: string, value: string) {
    return SingleFilter.fromPrimitives({
      field,
      operator: Operator.NOT_EQUAL,
      value
    })
  }
  
  static contains(field: string, value: string) {
    return SingleFilter.fromPrimitives({
      field,
      operator: Operator.CONTAINS,
      value
    })
  }

  static notContains(field: string, value: string) {
    return SingleFilter.fromPrimitives({
      field,
      operator: Operator.NOT_CONTAINS,
      value
    })
  }

  static greaterThan(field: string, value: string) {
    return SingleFilter.fromPrimitives({
      field,
      operator: Operator.GT,
      value
    })
  }

  static lessThan(field: string, value: string) {
    return SingleFilter.fromPrimitives({
      field,
      operator: Operator.LT,
      value
    })
  }
  
}
