export abstract class PaginatedQuery {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number,
    public readonly orderBy?: string,
    public readonly orderType?: string,
  ) {}
}
