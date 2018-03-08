import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const url = `http://dknsdc711tr6q:3000/${req.url}`;
        const cloneReq = req.clone({ url: url });
        return next.handle(cloneReq);
    }
}
