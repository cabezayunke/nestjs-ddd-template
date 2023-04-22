import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter, FilterType } from '@shared/domain/criteria/filters/Filter';
import { Operator } from '@shared/domain/criteria/filters/FilterOperator';
import { MultiFilter } from '@shared/domain/criteria/filters/MultiFilter';
import { SingleMultiValueFilter } from '@shared/domain/criteria/filters/SingleMultiValueFilter';
import { Order } from '@shared/domain/criteria/order/Order';
import { Pagination } from '@shared/domain/criteria/pagination/Pagination';
import { pickAs } from '@shared/domain/utils/pick';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { SingleFilter } from '../../domain/criteria/filters/SingleFilter';
import { QueryExecutor } from '../../domain/queries/QueryExecutor';

type WhereClause = [string, { [k: string]: string | string[] }];

export class TypeOrmQueryExecutor<T extends ObjectLiteral> implements QueryExecutor {
  constructor(private readonly repository: Repository<T>) {}

  private buildSingleValueWhere(filter: SingleFilter): WhereClause {
    const fieldName = filter.field.value;
    switch (filter.operator.value) {
      case Operator.EQUAL:
        return [`${fieldName} = :${fieldName}`, { [fieldName]: filter.value.value }];
      case Operator.NOT_EQUAL:
        return [`${fieldName} != :${fieldName}`, { [fieldName]: filter.value.value }];
      case Operator.CONTAINS:
        return [
          `${fieldName} LIKE= %:${fieldName}%`,
          { [fieldName]: filter.value.value },
        ];
      case Operator.NOT_CONTAINS:
        return [
          `${fieldName} NOT LIKE= %:${fieldName}%`,
          { [fieldName]: filter.value.value },
        ];
      default:
        throw new Error('Invalid operator');
    }
  }

  private buildMultiValueWhere(filter: SingleMultiValueFilter): WhereClause {
    const fieldName = filter.field.value;
    switch (filter.operator.value) {
      case Operator.IN:
        return [
          `${fieldName} IN (:...${fieldName})`,
          { [fieldName]: filter.values.map(f => f.value) },
        ];
      case Operator.NOT_IN:
        return [
          `${fieldName} NOT IN (:...${fieldName})`,
          { [fieldName]: filter.values.map(f => f.value) },
        ];
      default:
        throw new Error('Invalid operator');
    }
  }

  private handleSingleFilter(
    filter: SingleFilter,
    qb: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    const [query, params] = this.buildSingleValueWhere(filter);
    return qb.where(query, params);
  }

  private handleSingleMultiValueFilter(
    filter: SingleMultiValueFilter,
    qb: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    const [query, params] = this.buildMultiValueWhere(filter);
    return qb.where(query, params);
  }

  private handleAndFilter(
    filter: MultiFilter,
    qb: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    return filter.filters.reduce(
      (acc: SelectQueryBuilder<T>, filter: Filter, index: number) => {
        const [query, params] = this.buildSingleValueWhere(filter as SingleFilter);
        if (index === 0) {
          acc.where(query, params);
        } else {
          acc.andWhere(query, params);
        }
        return acc;
      },
      qb,
    );
  }

  private handleOrFilter(
    filter: MultiFilter,
    qb: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    return filter.filters.reduce(
      (acc: SelectQueryBuilder<T>, filter: Filter, index: number) => {
        const [query, params] = this.buildSingleValueWhere(filter as SingleFilter);
        if (index === 0) {
          acc.where(query, params);
        } else {
          acc.orWhere(query, params);
        }
        return acc;
      },
      qb,
    );
  }

  private handleFilter(filter: Filter, qb: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    if (filter instanceof SingleFilter) {
      return this.handleSingleFilter(filter, qb);
    }

    if (filter instanceof SingleMultiValueFilter) {
      return this.handleSingleMultiValueFilter(filter, qb);
    }

    if (filter instanceof MultiFilter) {
      if (filter.type === FilterType.AND) {
        return this.handleAndFilter(filter, qb);
      }

      if (filter.type === FilterType.OR) {
        return this.handleOrFilter(filter, qb);
      }
    }
    throw new Error('Invalid filter');
  }

  private handlePagination(
    pagination: Pagination,
    qb: SelectQueryBuilder<T>,
  ): SelectQueryBuilder<T> {
    if (pagination.limit) {
      qb.take(pagination.limit.value);
    }
    if (pagination.offset) {
      qb.skip(pagination.offset.value);
    }
    return qb;
  }

  private handleOrder(order: Order, qb: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    if (order) {
      qb.orderBy(
        order.orderBy.value,
        order.orderType.toString()?.toUpperCase() as 'ASC' | 'DESC',
      );
    }
    return qb;
  }

  async execute<Response>(criteria: Criteria): Promise<Response[]> {
    let qb = this.repository.createQueryBuilder('users');

    // where
    qb = criteria.hasFilter() ? this.handleFilter(criteria.filter as Filter, qb) : qb;

    // order
    qb = criteria.hasOrder() ? this.handleOrder(criteria.order as Order, qb) : qb;

    // skip === offset, take === limit
    qb = criteria.hasPagination()
      ? this.handlePagination(criteria.pagination as Pagination, qb)
      : qb;

    const result = await qb.getRawMany<Response>();
    return result.map((r: Response) =>
      pickAs(
        r as Record<string, any>,
        ['users_id', 'users_email', 'users_name'],
        ['id', 'email', 'name'],
      ),
    ) as Response[];
  }
}
