import { PaginatedQuery } from "@shared/domain/queries/PaginatedQuery";

export class GetUsersQuery extends PaginatedQuery {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number,
    public readonly orderBy?: string,
    public readonly orderType?: string,
  ) {
    super(limit, offset, orderBy, orderType);
  }
}
