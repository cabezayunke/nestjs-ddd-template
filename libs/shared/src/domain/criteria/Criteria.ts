import { Filter } from './filters/Filter';
import { Operator } from './filters/FilterOperator';
import { SingleFilter } from './filters/SingleFilter';
import { Order } from './order/Order';
import { Pagination } from './pagination/Pagination';

export interface CriteriaParams {
  filter: Filter;
  order?: Order;
  pagination?: Pagination;
}
export class Criteria {
  readonly filter?: Filter;
  readonly order?: Order;
  readonly pagination?: Pagination;
  
  constructor({ filter, order, pagination }: CriteriaParams) {
    this.filter = filter;
    this.order = order;
    this.pagination = pagination;
  }

  public hasFilter(): boolean {
    return !!this.filter && this.filter.hasFilter();
  }

  public hasOrder(): boolean {
    return !!this.order;
  }

  public hasPagination(): boolean {
    return !!this.pagination;
  }
  
  public isEmpty() {
    return !this.filter && !this.order && !this.pagination;
  }

  static equal(field: string, value: string): Criteria {
    return new Criteria({
      filter: SingleFilter.fromPrimitives({
        field,
        operator: Operator.EQUAL,
        value
      })
    })
  }

  static empty(): Criteria {
    return new Criteria({} as CriteriaParams);
  }

}
