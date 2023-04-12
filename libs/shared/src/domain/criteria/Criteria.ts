import { Order } from './Order';
import { Pagination } from './Pagination';
import { Filter } from './filters/Filter';

export interface CriteriaParams {
  filter: Filter;
  order?: Order;
  pagination?: Pagination;
}
export class Criteria {
  readonly filter: Filter;
  readonly order?: Order;
  readonly pagination?: Pagination;
  
  constructor({ filter, order, pagination }: CriteriaParams) {
    this.filter = filter;
    this.order = order;
    this.pagination = pagination;
  }

  public hasFilter(): boolean {
    return this.filter.hasFilter();
  }

  public hasOrder(): boolean {
    return !!this.order;
  }

  public hasPagination(): boolean {
    return !!this.pagination;
  }
  
}
