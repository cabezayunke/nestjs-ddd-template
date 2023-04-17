import { InvalidArgumentError } from '../../errors/InvalidArgumentError';
import { Filter, FilterType } from './Filter';
import { FilterField } from './FilterField';
import { FilterOperator, Operator } from './FilterOperator';
import { FilterMultiValuePrimitives } from './FilterPrimitives';
import { FilterValue } from './FilterValue';

export class SingleMultiValueFilter {
  readonly type: FilterType;
  readonly field: FilterField;
  readonly operator: FilterOperator;
  readonly values: FilterValue[];
  
  constructor(field: FilterField, operator: FilterOperator, values: FilterValue[]) {
    this.type = FilterType.SINGLE;
    this.field = field;
    this.operator = operator;
    this.values = values;
  }

  get value() {
    return this.values[0];
  }

  static fromPrimitives(primitiveValues: FilterMultiValuePrimitives): Filter {
    const { field, operator, values } = primitiveValues;

    if (!field || !operator || !values) {
      throw new InvalidArgumentError(`The filter is invalid`);
    }

    return new SingleMultiValueFilter(new FilterField(field), FilterOperator.fromValue(operator), values.map(v => new FilterValue(v)) );
  }

  hasFilter(): boolean {
    return !!this.field && !!this.operator && !!this.values && !!this.values.length;
  }
  static in(field: string, values: string[]) {
    return SingleMultiValueFilter.fromPrimitives({
      field,
      operator: Operator.IN,
      values
    })
  }

  static notIn(field: string, values: string[]) {
    return SingleMultiValueFilter.fromPrimitives({
      field,
      operator: Operator.NOT_IN,
      values
    })
  }
}
