import { CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { merge, Observable, of } from 'rxjs';
import { FastifyReply } from 'fastify';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(private readonly _logger: Logger) {
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
    const cls = context.getClass();
    const handler = context.getHandler();
    const response: FastifyReply = context.switchToHttp().getResponse<FastifyReply>();

    return next.handle()
      .pipe(
        map(_ => of(_)),
        mergeMap((obs: Observable<any>) =>
          merge(
            obs
              .pipe(
                filter(_ => !!_),
                map(_ => _),
              ),
            obs
              .pipe(
                filter(_ => !_),
                tap(_ => response.status(204)),
                map(_ => _),
              ),
          )),
        tap(_ => this._logger.log(!!_ ? _ : 'NO CONTENT', `UserInterceptor => ${cls.name}.${handler.name}`)),
      );
  }
}
