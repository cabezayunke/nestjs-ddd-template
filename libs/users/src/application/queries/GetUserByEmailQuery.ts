import { Query } from "@shared/domain/queries/Query";

export class GetUserByEmailQuery implements Query {
  constructor(public readonly email: string) {}
}
