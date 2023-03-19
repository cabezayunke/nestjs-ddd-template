import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainError } from '@shared/domain/errors/DomainError';
import { Request, Response } from 'express';

@Catch()
export class DomainErrorHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorName = exception.name.toLowerCase();

    let status = 500;
    let event = 'n/a';

    if (exception instanceof DomainError) {
      status = 400;
      event = exception.event;

      if (errorName.includes('notfound')) {
        status = 404;
      }
      if (errorName.includes('alradyexists') || errorName.includes('conflict')) {
        status = 409;
      }
    }

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.message,
      event,
    });
  }
}
