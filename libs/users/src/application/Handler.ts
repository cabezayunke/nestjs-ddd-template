import {
  RequestContext,
  RequestContextData,
} from '@shared/infrastructure/server/RequestContext';

export abstract class Handler {
  getRequestContextData(): RequestContextData {
    return { requestId: RequestContext.get().req.requestId };
  }
}
