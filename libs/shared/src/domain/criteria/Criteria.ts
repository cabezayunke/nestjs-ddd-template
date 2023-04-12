import { Filter } from './Filter';
import { Order } from './Order';
import { Pagination } from './Pagination';

export class Criteria {
  readonly filters: Filter[];
  readonly order: Order;
  readonly pagination?: Pagination;
  
  constructor(filters: Filter[], order: Order, pagination: Pagination) {
    this.filters = filters;
    this.order = order;
    this.pagination = pagination;
  }

  public hasFilters(): boolean {
    return this.filters.length > 0;
  }
  
}
