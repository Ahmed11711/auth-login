import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  // !Great Using of interceptor  .
  // !Comment why using any type ?

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        // Format successful responses
        const response = {
          statusCode: HttpStatus.OK,
          message: 'Request was successful',
          data,
        };
        context.switchToHttp().getResponse().json(response);
      }),
      catchError((error) => {
        // Handle and format errors
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          error instanceof HttpException
            ? error.message
            : 'Internal server error';

        const response = {
          statusCode,
          message,
        };

        return new Observable((observer) => {
          context
            .switchToHttp()
            .getResponse()
            .status(statusCode)
            .json(response);
          observer.complete();
        });
      }),
    );
  }
}
