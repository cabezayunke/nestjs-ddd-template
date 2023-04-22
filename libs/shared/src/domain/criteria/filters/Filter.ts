import { MultiFilter } from './MultiFilter';
import { SingleFilter } from './SingleFilter';
import { SingleMultiValueFilter } from './SingleMultiValueFilter';

export type Filter = SingleFilter | MultiFilter | SingleMultiValueFilter;

export enum FilterType {
  SINGLE,
  SINGLE_MULTI,
  AND,
  OR,
  EMPTY,
}
