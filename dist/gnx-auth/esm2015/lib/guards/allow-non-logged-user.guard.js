/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GnxAuthService } from "../gnx-auth.service";
import { of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "../gnx-auth.service";
import * as i2 from "@angular/router";
export class AllowNonLoggedUserGuard {
    /**
     * @param {?} auth
     * @param {?} router
     */
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    /**
     * @return {?}
     */
    canActivate() {
        return of(null).pipe(switchMap((/**
         * @return {?}
         */
        () => this.auth.getToken())), map((/**
         * @param {?} token
         * @return {?}
         */
        token => {
            return true;
        })) // always returns true, needed to try to get token from cookie
        );
    }
}
AllowNonLoggedUserGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
AllowNonLoggedUserGuard.ctorParameters = () => [
    { type: GnxAuthService },
    { type: Router }
];
/** @nocollapse */ AllowNonLoggedUserGuard.ngInjectableDef = i0.defineInjectable({ factory: function AllowNonLoggedUserGuard_Factory() { return new AllowNonLoggedUserGuard(i0.inject(i1.GnxAuthService), i0.inject(i2.Router)); }, token: AllowNonLoggedUserGuard, providedIn: "root" });
if (false) {
    /** @type {?} */
    AllowNonLoggedUserGuard.prototype.auth;
    /** @type {?} */
    AllowNonLoggedUserGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb3ctbm9uLWxvZ2dlZC11c2VyLmd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdueC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2d1YXJkcy9hbGxvdy1ub24tbG9nZ2VkLXVzZXIuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFjLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQWEsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLOUMsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFDbEMsWUFBbUIsSUFBb0IsRUFBUyxNQUFjO1FBQTNDLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7Ozs7SUFDbEUsV0FBVztRQUNULE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDbEIsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQyxFQUNyQyxHQUFHOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUFDLDhEQUE4RDtTQUNsRSxDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTk8sY0FBYztZQURELE1BQU07Ozs7O0lBU2IsdUNBQTJCOztJQUFFLHlDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtDYW5BY3RpdmF0ZSwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7R254QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9nbngtYXV0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7bWFwLCBzd2l0Y2hNYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFsbG93Tm9uTG9nZ2VkVXNlckd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhdXRoOiBHbnhBdXRoU2VydmljZSwgcHVibGljIHJvdXRlcjogUm91dGVyKSB7fVxyXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG9mKG51bGwpLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmF1dGguZ2V0VG9rZW4oKSksXHJcbiAgICAgIG1hcCh0b2tlbiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0pIC8vIGFsd2F5cyByZXR1cm5zIHRydWUsIG5lZWRlZCB0byB0cnkgdG8gZ2V0IHRva2VuIGZyb20gY29va2llXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=