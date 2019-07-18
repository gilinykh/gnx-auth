import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, first, switchMap} from "rxjs/operators";
import {GnxAuthService} from "../gnx-auth.service";

@Injectable()
export class GnxRefreshTokenInterceptor implements HttpInterceptor {

  private notTriedYet = true;

    constructor(private gnxAuthService: GnxAuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.startsWith('/api/')) {
        return next.handle(req).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401) { // it seems access token hs expired, try to get new tokens by refresh token
              if (this.notTriedYet) {
                this.notTriedYet = false;
                return this.gnxAuthService.getAccessTokenByRefreshToken().pipe(
                  first(),
                  switchMap(token => {
                    this.notTriedYet = true;
                    if (token) {
                      let newRequest = req.clone({
                        setHeaders: {
                          Authorization: 'Bearer ' + token.encodedToken
                        }
                      });
                      return next.handle(newRequest);
                    }
                    this.gnxAuthService.redirectToLoginPage();
                  })
                );
              } else {
                this.notTriedYet = true;
                this.gnxAuthService.redirectToLoginPage();
              }
            } else {
              return throwError(err);
            }
          })
        );
      }

      return next.handle(req);
    }
}
