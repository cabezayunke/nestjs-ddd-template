
import { SingleMultiValueFilter } from "@shared/domain/criteria/filters/SingleMultiValueFilter"
import { Order } from "@shared/domain/criteria/order/Order"
import { OrderTypes } from "@shared/domain/criteria/order/OrderType"
import { Pagination } from "@shared/domain/criteria/pagination/Pagination"
import { Criteria } from "../../domain/criteria/Criteria"
import { Filter, FilterType } from "../../domain/criteria/filters/Filter"
import { Operator } from "../../domain/criteria/filters/FilterOperator"
import { MultiFilter } from "../../domain/criteria/filters/MultiFilter"
import { SingleFilter } from "../../domain/criteria/filters/SingleFilter"
import { QueryExecutor } from "../../domain/queries/QueryExecutor"

export class InMemoryQueryExecutor implements QueryExecutor {
  constructor(private readonly data: Record<string, any>[] = []) {}
  
  private equalFilter(element: any, filter: SingleFilter) {
    const { field, value } = filter;
    return element[field.value.toString()] && element[field.value.toString()] === value.toString();     
  }
  
  private notEqualFilter(element: any, filter: SingleFilter) {
    const { field, value } = filter;
    return element[field.value.toString()] && element[field.value.toString()] !== value.toString();     
  }

  private containsFilter(element: any, filter: SingleFilter) {
    const { field, value } = filter;
    return element[field.value.toString()] && element[field.value.toString()].includes(value.toString());
  }

  private notContainsFilter(element: any, filter: SingleFilter) {
    const { field, value } = filter;
    return element[field.value.toString()] && !element[field.value.toString()].includes(value.toString());
  }

  private applyFilter(element: any, filter: SingleFilter) {
    switch (filter.operator.value) {
      case Operator.EQUAL:
        return this.equalFilter(element, filter);
      case Operator.NOT_EQUAL:
        return this.notEqualFilter(element, filter);
      case Operator.CONTAINS:
        return this.containsFilter(element, filter);
      case Operator.NOT_CONTAINS:
        return this.notContainsFilter(element, filter);
      default:
        throw new Error('Invalid operator')  
    }
  }

  private inFilter(element: any, filter: SingleMultiValueFilter) {
    const { field, values } = filter;
    console.log(filter, element)
    return element[field.value.toString()] && values.map(v => v.value).includes(element[field.value.toString()]);
  }

  private notInFilter(element: any, filter: SingleMultiValueFilter) {
    const { field, values } = filter;
    console.log(filter, element)
    return element[field.value.toString()] && !values.map(v => v.value).includes(element[field.value.toString()]);
  }

  private applyMultiValueFilter(element: any, filter: SingleMultiValueFilter) {
    switch (filter.operator.value) {
      case Operator.IN:
        return this.inFilter(element, filter);
      case Operator.NOT_IN:
        return this.notInFilter(element, filter);
      default:
        throw new Error('Invalid operator')  
    }
  }

  private handleSingleFilter(filter: SingleFilter) {
    return (element: any) => this.applyFilter(element, filter);
  }

  private handleSingleMultiValueFilter(filter: SingleMultiValueFilter) {
    return (element: any) => this.applyMultiValueFilter(element, filter);
  }

  private handleAndFilter(filter: MultiFilter) {
    return (element: any) => filter.filters.every((filter: SingleFilter) => this.applyFilter(element, filter));
  }

  private handleOrFilter(filter: MultiFilter) {
    return (element: any) => filter.filters.some((filter: SingleFilter) => this.applyFilter(element, filter));
  }

  private handleFilter(filter: Filter) {
    if (filter instanceof SingleFilter) {
      return this.handleSingleFilter(filter);
    }
    
    if (filter instanceof SingleMultiValueFilter) {
      return this.handleSingleMultiValueFilter(filter);
    }

    if (filter instanceof MultiFilter) {
      if (filter.type === FilterType.AND) {
        return this.handleAndFilter(filter);
      }

      if (filter.type === FilterType.OR) {
        return this.handleOrFilter(filter);
      }
    }
    throw new Error('Invalid filter');
  }

  private handlePagination(pagination: Pagination, data: Record<string, any>[] ): Record<string, any>[]  {
    return pagination
      ? data.slice(pagination?.offset.value, pagination?.offset.value + pagination?.limit.value)
      : data;
  }

  private handleOrder(order: Order, data: Record<string, any>[] ): Record<string, any>[]  {
    if (order) {
      const orderField = order?.orderBy.value;
      if (orderField && order?.orderType.value === OrderTypes.ASC) {
        return data.sort((a: any, b: any) => a[orderField] > b[orderField] ? 1 : -1)
      } else if (order?.orderType.value === OrderTypes.DESC) {
        return data.sort((a: any, b: any) => a[orderField] > b[orderField] ? -1 : 1)
      }
    }
    return data;
  }

  execute<Response>(criteria: Criteria): Response[] | Promise<Response[]> {

    const filteredData = criteria.hasFilter()
      ? this.data.filter(this.handleFilter(criteria.filter as Filter))
      : this.data;

    return this.handleOrder(
      criteria.order as Order, 
      this.handlePagination(criteria.pagination as Pagination, filteredData)
    ) as Response[];
  }
}