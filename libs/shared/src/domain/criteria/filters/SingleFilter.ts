import { InvalidArgumentError } from '../../errors/InvalidArgumentError';
import { Filter, FilterType } from './Filter';
import { FilterField } from './FilterField';
import { FilterOperator } from './FilterOperator';
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

  static fromPrimitives(values: FilterPrimitives): Filter {
    const { field, operator, value } = values;

    if (!field || !operator || !value) {
      throw new InvalidArgumentError(`The filter is invalid`);
    }

    return new SingleFilter(new FilterField(field), FilterOperator.fromValue(operator), new FilterValue(value));
  }

  hasFilter(): boolean {
    return !!this.field && !!this.operator && !!this.value;
  }
  
}
