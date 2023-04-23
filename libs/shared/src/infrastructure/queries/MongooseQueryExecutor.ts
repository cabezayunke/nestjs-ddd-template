import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterType } from '@shared/domain/criteria/filters/Filter';
import { Operator } from '@shared/domain/criteria/filters/FilterOperator';
import { MultiFilter } from '@shared/domain/criteria/filters/MultiFilter';
import { SingleMultiValueFilter } from '@shared/domain/criteria/filters/SingleMultiValueFilter';
import { Order } from '@shared/domain/criteria/order/Order';
import { Pagination } from '@shared/domain/criteria/pagination/Pagination';
import { pick } from '@shared/domain/utils/pick';
import { Model, Query } from 'mongoose';
import { SingleFilter } from '../../domain/criteria/filters/SingleFilter';
import { QueryExecutor } from '../../domain/queries/QueryExecutor';

export class MongooseQueryExecutor<Document> implements QueryExecutor {
  constructor(private readonly model: Model<Document>) {}

  private buildSingleValueWhere(filter: SingleFilter): Record<string, any> {
    const fieldName = filter.field.value;
    switch (filter.operator.value) {
      case Operator.EQUAL:
        return { [fieldName]: filter.value.value };
      case Operator.NOT_EQUAL:
        return { [fieldName]: { $ne: filter.value.value } };
      case Operator.CONTAINS:
        return { [fieldName]: { $regex: filter.value.value, $options: 'i' } };
      case Operator.NOT_CONTAINS:
        return { [fieldName]: { $not: { $regex: filter.value.value, $options: 'i' } } };
      default:
        throw new Error('Invalid operator');
    }
  }

  private buildMultiValueWhere(filter: SingleMultiValueFilter): Record<string, any> {
    const fieldName = filter.field.value;
    switch (filter.operator.value) {
      case Operator.IN:
        return { [fieldName]: { $in: filter.values.map(f => f.value) } };
      case Operator.NOT_IN:
        return { [fieldName]: { $not: { $in: filter.values.map(f => f.value) } } };
      default:
        throw new Error('Invalid operator');
    }
  }

  private buildWhereClause(filter: Filter): Record<string, any> {
    if (filter instanceof SingleFilter) {
      return this.buildSingleValueWhere(filter);
    }
    if (filter instanceof SingleMultiValueFilter) {
      return this.buildMultiValueWhere(filter);
    }
    throw new Error('Invalid filter');
  }

  private handleSingleFilter(
    filter: SingleFilter | SingleMultiValueFilter,
    query: Query<Document[], Document>,
  ): Query<Document[], Document> {
    const queryObject = this.buildWhereClause(filter);
    return query.where(queryObject);
  }

  private handleAndFilter(
    filter: MultiFilter,
    query: Query<Document[], Document>,
  ): Query<Document[], Document> {
    const queryObject = filter.filters.map((f: SingleFilter) => this.buildWhereClause(f));
    return query.and(queryObject);
  }

  private handleOrFilter(
    filter: MultiFilter,
    query: Query<Document[], Document>,
  ): Query<Document[], Document> {
    const queryObject = filter.filters.map((f: SingleFilter) => this.buildWhereClause(f));
    return query.or(queryObject);
  }

  private handleFilter(
    filter: Filter,
    query: Query<Document[], Document>,
  ): Query<Document[], Document> {
    const isSingleFilter =
      filter instanceof SingleFilter || filter instanceof SingleMultiValueFilter;
    if (isSingleFilter) {
      return this.handleSingleFilter(filter, query);
    }

    if (filter instanceof MultiFilter) {
      if (filter.type === FilterType.AND) {
        return this.handleAndFilter(filter, query);
      }

      if (filter.type === FilterType.OR) {
        return this.handleOrFilter(filter, query);
      }
    }
    throw new Error('Invalid filter');
  }

  private handlePagination(
    pagination: Pagination,
    query: Query<Document[], Document>,
  ): Query<Document[], Document> {
    if (pagination.limit) {
      query.limit(pagination.limit.value);
    }
    if (pagination.offset) {
      query.skip(pagination.offset.value);
    }
    return query;
  }

  private handleOrder(
    order: Order,
    query: Query<Document[], Document>,
  ): Query<Document[], Document> {
    if (order) {
      query.sort({ [order.orderBy.value]: order.orderType.toString() as 'asc' | 'desc' });
    }
    return query;
  }

  async execute<Response>(criteria: Criteria): Promise<Response[]> {
    let query: Query<Document[], Document> = this.model.find();
    query.setOptions({ lean: true });

    // where
    query = criteria.hasFilter()
      ? this.handleFilter(criteria.filter as Filter, query)
      : query;

    // order
    query = criteria.hasOrder()
      ? this.handleOrder(criteria.order as Order, query)
      : query;

    // skip === offset
    query = criteria.hasPagination()
      ? this.handlePagination(criteria.pagination as Pagination, query)
      : query;

    query.setOptions({ lean: true });

    const result = await query.exec();
    return result.map((r: Document) =>
      pick(r as Record<string, any>, ['id', 'email', 'name']),
    ) as Response[];
  }
}
