import { PaginationLimit } from './PaginationLimit';
import { PaginationOffset } from './PaginationOffset';

export class Pagination {
  readonly limit: PaginationLimit;
  readonly offset: PaginationOffset;

  constructor(limit: PaginationLimit, offset: PaginationOffset) {
    this.limit = limit;
    this.offset = offset;
  }

  static fromValues({ limit, offset }: { limit?: number; offset?: number }): Pagination {
    if (!limit) {
      return Pagination.default();
    }

    return new Pagination(new PaginationLimit(limit), new PaginationOffset(offset ?? 0));
  }

  static default(): Pagination {
    return Pagination.fromValues({ limit: 100, offset: 0 });
  }
}
