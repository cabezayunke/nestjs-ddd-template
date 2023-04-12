export interface Filter {
  hasFilter(): boolean;
  getType(): FilterType;
  getFilters(): Filter[];
}

export enum FilterType {
  SINGLE,
  AND,
  OR
}