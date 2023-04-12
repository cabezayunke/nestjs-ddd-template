import { Criteria } from "../criteria/Criteria";

export interface Repository<I, A> {
    find(criteria: Criteria): Promise<A | A[]>;
    remove(id: I): Promise<void>;
    save(data: A): Promise<void>;
}