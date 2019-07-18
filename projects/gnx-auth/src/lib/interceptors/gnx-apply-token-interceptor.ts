import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {GnxAuthService} from "../gnx-auth.service";
import {first, map, switchMap} from "rxjs/operators";

@Injectable()
export class GnxApplyTokenInterceptor implements HttpInterceptor {

  constructor(private gnxAuthService: GnxAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/api/') > -1) {
      return this.gnxAuthService.getToken().pipe(
        first(),
        map(token => {
            if (token) {
              return req.clone({
                setHeaders: {
                  Authorization: 'Bearer ' + token.encodedToken
                }
              })
            }
            return req;
          }
        ),
        switchMap(request => next.handle(request)),
      );
    }
    return next.handle(req);
  }
}
