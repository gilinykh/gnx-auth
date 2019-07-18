/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GnxAuthService } from "../gnx-auth.service";
import { map } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "../gnx-auth.service";
import * as i2 from "@angular/router";
var RequireLoggedUserGuard = /** @class */ (function () {
    function RequireLoggedUserGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    /**
     * @return {?}
     */
    RequireLoggedUserGuard.prototype.canActivate = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.auth.getToken().pipe(map((/**
         * @param {?} token
         * @return {?}
         */
        function (token) {
            if (!token) {
                _this.auth.redirectToLoginPage();
                return false;
            }
            return true;
        })));
    };
    RequireLoggedUserGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    RequireLoggedUserGuard.ctorParameters = function () { return [
        { type: GnxAuthService },
        { type: Router }
    ]; };
    /** @nocollapse */ RequireLoggedUserGuard.ngInjectableDef = i0.defineInjectable({ factory: function RequireLoggedUserGuard_Factory() { return new RequireLoggedUserGuard(i0.inject(i1.GnxAuthService), i0.inject(i2.Router)); }, token: RequireLoggedUserGuard, providedIn: "root" });
    return RequireLoggedUserGuard;
}());
export { RequireLoggedUserGuard };
if (false) {
    /** @type {?} */
    RequireLoggedUserGuard.prototype.auth;
    /** @type {?} */
    RequireLoggedUserGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1sb2dnZWQtdXNlci5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnbngvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9ndWFyZHMvcmVxdWlyZS1sb2dnZWQtdXNlci5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVuQztJQUlFLGdDQUFtQixJQUFvQixFQUFTLE1BQWM7UUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQzs7OztJQUNsRSw0Q0FBVzs7O0lBQVg7UUFBQSxpQkFVQztRQVRDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQzlCLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDaEMsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2dCQWZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTk8sY0FBYztnQkFERCxNQUFNOzs7aUNBRDNCO0NBc0JDLEFBaEJELElBZ0JDO1NBYlksc0JBQXNCOzs7SUFDckIsc0NBQTJCOztJQUFFLHdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtDYW5BY3RpdmF0ZSwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7R254QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9nbngtYXV0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHttYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlcXVpcmVMb2dnZWRVc2VyR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGF1dGg6IEdueEF1dGhTZXJ2aWNlLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHt9XHJcbiAgY2FuQWN0aXZhdGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5hdXRoLmdldFRva2VuKCkucGlwZShcclxuICAgICAgbWFwKHRva2VuID0+IHtcclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICB0aGlzLmF1dGgucmVkaXJlY3RUb0xvZ2luUGFnZSgpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSksXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=