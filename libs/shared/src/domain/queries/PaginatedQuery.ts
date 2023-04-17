import { Query } from "./Query";

export abstract class PaginatedQuery implements Query {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number,
    public readonly orderBy?: string,
    public readonly orderType?: string,
  ) {}

}