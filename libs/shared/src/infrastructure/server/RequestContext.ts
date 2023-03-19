import { RequestContext as NestRequestContext } from 'nestjs-request-context';
import { v4 as UuidV4 } from 'uuid';

export interface RequestContextData {
  requestId: string;
}

export class RequestContext {
  static get(): NestRequestContext<RequestContextData> {
    return NestRequestContext.currentContext;
  }

  static createRequestId(): string {
    return UuidV4();
  }
}
