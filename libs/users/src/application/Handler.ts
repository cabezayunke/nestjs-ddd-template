import {
  RequestContext,
  RequestContextData,
} from '@utils/server/infrastructure/RequestContext';

export abstract class Handler {
  getRequestContextData(): RequestContextData {
    return { requestId: RequestContext.get().req.requestId };
  }
}
