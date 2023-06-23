import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

// https://github.com/angular/angular/issues/20564#issuecomment-395968476
export function createHttpParams(params: Params): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(param => {
        if (params[param]) {
            httpParams = httpParams.set(param, params[param]);
        }
    });

    return httpParams;
}
