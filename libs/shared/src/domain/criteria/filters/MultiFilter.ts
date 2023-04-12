import { InvalidArgumentError } from "@shared/domain/errors/InvalidArgumentError";
import { Filter, FilterType } from "./Filter";

export class MultiFilter implements Filter {
  
  readonly filters: Filter[];
  readonly type: FilterType;

  private constructor(type: FilterType, ...filters: Filter[]) {
    if (!filters || filters.length < 2) {
      throw new InvalidArgumentError("You need at least 2 filters");
    }

    this.type = type;
    this.filters = filters;
  }

  hasFilter(): boolean {
    return this.filters?.every(f => f.hasFilter());
  }

  static or(...filters: Filter[]): Filter {
    return new MultiFilter(FilterType.OR, ...filters);
  }

  static and(...filters: Filter[]): Filter {
    return new MultiFilter(FilterType.AND, ...filters);
  }

  getType(): FilterType {
    return this.type;
  }

  getFilters(): Filter[] {
    return this.filters;
  }
}
