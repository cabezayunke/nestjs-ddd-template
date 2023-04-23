import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainError } from '@shared/domain/errors/DomainError';
import {
  RequestContext,
  RequestContextData,
} from '@utils/server/infrastructure/RequestContext';
import { Request, Response } from 'express';
import { Logger } from '../../../../logger/src/domain/Logger';

@Catch()
export class DomainErrorHandler implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  getRequestContextData(): RequestContextData {
    return { requestId: RequestContext.get().req.requestId };
  }

  catch(exception: Error | DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    /**
     * exception.constructor.name = concrete implementation (ie: UserNotFound)
     * exception.name = Error
     */
    const errorName = exception.constructor.name.toLowerCase();
    this.logger.info(errorName);

    let status = 500;
    let event = 'n/a';

    if (exception instanceof DomainError) {
      status = 400;
      event = exception.event;

      if (errorName.includes('notfound')) {
        status = 404;
      }
      if (errorName.includes('alreadyexists') || errorName.includes('conflict')) {
        status = 409;
      }
    }

    const data = {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.message,
      event,
      ...this.getRequestContextData(),
    };
    this.logger.error(errorName, data);
    response.status(status).json();
  }
}
