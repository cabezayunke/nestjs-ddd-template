import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext, RequestContextData } from './RequestContext';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware<RequestContextData> {
  use(req: RequestContextData, _: any, next: () => void): void {
    req.requestId = RequestContext.createRequestId();

    next();
  }
}
