import { Filter } from './filters/Filter';
import { SingleFilter } from './filters/SingleFilter';
import { SingleMultiValueFilter } from './filters/SingleMultiValueFilter';
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

  static empty(): Criteria {
    return new Criteria({} as CriteriaParams);
  }

  static equal(field: string, value: string): Criteria {
    return new Criteria({
      filter: SingleFilter.equal(field, value)
    })
  }

  static notEqual(field: string, value: string): Criteria {
    return new Criteria({
      filter: SingleFilter.notEqual(field, value)
    })
  }

  static contains(field: string, value: string): Criteria {
    return new Criteria({
      filter: SingleFilter.contains(field, value)
    })
  }

  static notContains(field: string, value: string): Criteria {
    return new Criteria({
      filter: SingleFilter.notContains(field, value)
    })
  }

  static in(field: string, values: string[]): Criteria {
    return new Criteria({
      filter: SingleMultiValueFilter.in(field, values)
    })
  }

  static notIn(field: string, values: string[]): Criteria {
    return new Criteria({
      filter: SingleMultiValueFilter.notIn(field, values)
    })
  }
}
