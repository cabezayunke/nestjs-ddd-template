import { MultiFilter } from "./MultiFilter";
import { SingleFilter } from "./SingleFilter";

export type Filter = SingleFilter | MultiFilter;

export enum FilterType {
  SINGLE,
  AND,
  OR,
  EMPTY
}