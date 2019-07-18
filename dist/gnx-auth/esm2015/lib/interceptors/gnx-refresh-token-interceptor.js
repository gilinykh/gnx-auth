/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, first, switchMap } from "rxjs/operators";
import { GnxAuthService } from "../gnx-auth.service";
export class GnxRefreshTokenInterceptor {
    /**
     * @param {?} gnxAuthService
     */
    constructor(gnxAuthService) {
        this.gnxAuthService = gnxAuthService;
        this.notTriedYet = true;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        if (req.url.startsWith('/api/')) {
            return next.handle(req).pipe(catchError((/**
             * @param {?} err
             * @return {?}
             */
            err => {
                if (err instanceof HttpErrorResponse && err.status === 401) { // it seems access token hs expired, try to get new tokens by refresh token
                    if (this.notTriedYet) {
                        this.notTriedYet = false;
                        return this.gnxAuthService.getAccessTokenByRefreshToken().pipe(first(), switchMap((/**
                         * @param {?} token
                         * @return {?}
                         */
                        token => {
                            this.notTriedYet = true;
                            if (token) {
                                /** @type {?} */
                                let newRequest = req.clone({
                                    setHeaders: {
                                        Authorization: 'Bearer ' + token.encodedToken
                                    }
                                });
                                return next.handle(newRequest);
                            }
                            this.gnxAuthService.redirectToLoginPage();
                        })));
                    }
                    else {
                        this.notTriedYet = true;
                        this.gnxAuthService.redirectToLoginPage();
                    }
                }
                else {
                    return throwError(err);
                }
            })));
        }
        return next.handle(req);
    }
}
GnxRefreshTokenInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GnxRefreshTokenInterceptor.ctorParameters = () => [
    { type: GnxAuthService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    GnxRefreshTokenInterceptor.prototype.notTriedYet;
    /**
     * @type {?}
     * @private
     */
    GnxRefreshTokenInterceptor.prototype.gnxAuthService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ254LXJlZnJlc2gtdG9rZW4taW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ254L2F1dGgvIiwic291cmNlcyI6WyJsaWIvaW50ZXJjZXB0b3JzL2dueC1yZWZyZXNoLXRva2VuLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxpQkFBaUIsRUFBdUQsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RyxPQUFPLEVBQWEsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUduRCxNQUFNLE9BQU8sMEJBQTBCOzs7O0lBSW5DLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUY1QyxnQkFBVyxHQUFHLElBQUksQ0FBQztJQUd6QixDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjtRQUNoRCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzFCLFVBQVU7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDZixJQUFJLEdBQUcsWUFBWSxpQkFBaUIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLDJFQUEyRTtvQkFDdkksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFDekIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMsSUFBSSxDQUM1RCxLQUFLLEVBQUUsRUFDUCxTQUFTOzs7O3dCQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzs0QkFDeEIsSUFBSSxLQUFLLEVBQUU7O29DQUNMLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29DQUN6QixVQUFVLEVBQUU7d0NBQ1YsYUFBYSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWTtxQ0FDOUM7aUNBQ0YsQ0FBQztnQ0FDRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7NkJBQ2hDOzRCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzt3QkFDNUMsQ0FBQyxFQUFDLENBQ0gsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3FCQUMzQztpQkFDRjtxQkFBTTtvQkFDTCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEI7WUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0g7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7O1lBMUNKLFVBQVU7Ozs7WUFGSCxjQUFjOzs7Ozs7O0lBS3BCLGlEQUEyQjs7Ozs7SUFFYixvREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHBFcnJvclJlc3BvbnNlLCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQge09ic2VydmFibGUsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2NhdGNoRXJyb3IsIGZpcnN0LCBzd2l0Y2hNYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQge0dueEF1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vZ254LWF1dGguc2VydmljZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR254UmVmcmVzaFRva2VuSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuICBwcml2YXRlIG5vdFRyaWVkWWV0ID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdueEF1dGhTZXJ2aWNlOiBHbnhBdXRoU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG4gICAgICBpZiAocmVxLnVybC5zdGFydHNXaXRoKCcvYXBpLycpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcclxuICAgICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlICYmIGVyci5zdGF0dXMgPT09IDQwMSkgeyAvLyBpdCBzZWVtcyBhY2Nlc3MgdG9rZW4gaHMgZXhwaXJlZCwgdHJ5IHRvIGdldCBuZXcgdG9rZW5zIGJ5IHJlZnJlc2ggdG9rZW5cclxuICAgICAgICAgICAgICBpZiAodGhpcy5ub3RUcmllZFlldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RUcmllZFlldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ254QXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW5CeVJlZnJlc2hUb2tlbigpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgIGZpcnN0KCksXHJcbiAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RUcmllZFlldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UmVxdWVzdCA9IHJlcS5jbG9uZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiAnQmVhcmVyICcgKyB0b2tlbi5lbmNvZGVkVG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ254QXV0aFNlcnZpY2UucmVkaXJlY3RUb0xvZ2luUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RUcmllZFlldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdueEF1dGhTZXJ2aWNlLnJlZGlyZWN0VG9Mb2dpblBhZ2UoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcclxuICAgIH1cclxufVxyXG4iXX0=