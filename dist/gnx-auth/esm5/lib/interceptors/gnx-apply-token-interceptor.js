/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GnxAuthService } from "../gnx-auth.service";
import { first, map, switchMap } from "rxjs/operators";
var GnxApplyTokenInterceptor = /** @class */ (function () {
    function GnxApplyTokenInterceptor(gnxAuthService) {
        this.gnxAuthService = gnxAuthService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    GnxApplyTokenInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        if (req.url.indexOf('/api/') > -1) {
            return this.gnxAuthService.getToken().pipe(first(), map((/**
             * @param {?} token
             * @return {?}
             */
            function (token) {
                if (token) {
                    return req.clone({
                        setHeaders: {
                            Authorization: 'Bearer ' + token.encodedToken
                        }
                    });
                }
                return req;
            })), switchMap((/**
             * @param {?} request
             * @return {?}
             */
            function (request) { return next.handle(request); })));
        }
        return next.handle(req);
    };
    GnxApplyTokenInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GnxApplyTokenInterceptor.ctorParameters = function () { return [
        { type: GnxAuthService }
    ]; };
    return GnxApplyTokenInterceptor;
}());
export { GnxApplyTokenInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GnxApplyTokenInterceptor.prototype.gnxAuthService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ254LWFwcGx5LXRva2VuLWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdueC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2ludGVyY2VwdG9ycy9nbngtYXBwbHktdG9rZW4taW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXJEO0lBR0Usa0NBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNsRCxDQUFDOzs7Ozs7SUFFRCw0Q0FBUzs7Ozs7SUFBVCxVQUFVLEdBQXFCLEVBQUUsSUFBaUI7UUFDaEQsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUN4QyxLQUFLLEVBQUUsRUFDUCxHQUFHOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNMLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQzt3QkFDZixVQUFVLEVBQUU7NEJBQ1YsYUFBYSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWTt5QkFDOUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUNELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxFQUNGLEVBQ0QsU0FBUzs7OztZQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBcEIsQ0FBb0IsRUFBQyxDQUMzQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Z0JBekJGLFVBQVU7Ozs7Z0JBSEgsY0FBYzs7SUE2QnRCLCtCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F6Qlksd0JBQXdCOzs7Ozs7SUFFdkIsa0RBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0dueEF1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vZ254LWF1dGguc2VydmljZVwiO1xyXG5pbXBvcnQge2ZpcnN0LCBtYXAsIHN3aXRjaE1hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbnhBcHBseVRva2VuSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdueEF1dGhTZXJ2aWNlOiBHbnhBdXRoU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICBpZiAocmVxLnVybC5pbmRleE9mKCcvYXBpLycpID4gLTEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ254QXV0aFNlcnZpY2UuZ2V0VG9rZW4oKS5waXBlKFxyXG4gICAgICAgIGZpcnN0KCksXHJcbiAgICAgICAgbWFwKHRva2VuID0+IHtcclxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcS5jbG9uZSh7XHJcbiAgICAgICAgICAgICAgICBzZXRIZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246ICdCZWFyZXIgJyArIHRva2VuLmVuY29kZWRUb2tlblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApLFxyXG4gICAgICAgIHN3aXRjaE1hcChyZXF1ZXN0ID0+IG5leHQuaGFuZGxlKHJlcXVlc3QpKSxcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xyXG4gIH1cclxufVxyXG4iXX0=