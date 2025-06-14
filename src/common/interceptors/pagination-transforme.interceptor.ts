import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

@Injectable()
export class PaginationTransformInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private readonly dto: new (...args: any[]) => T) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((response) => {
                if (response && typeof response === 'object' && 'data' in response && 'meta' in response) {
                    return {
                        data: plainToInstance(this.dto, response.data, {
                            excludeExtraneousValues: true
                        }),
                        meta: response.meta
                    };
                }

                return plainToInstance(this.dto, response, {
                    excludeExtraneousValues: true
                });
            }),
        );
    }
}