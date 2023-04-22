import { Criteria } from '../criteria/Criteria';

export interface QueryExecutor {
  execute<Response>(criteria: Criteria): Promise<Response[]> | Response[];
}
