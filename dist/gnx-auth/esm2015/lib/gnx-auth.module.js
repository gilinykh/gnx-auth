/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// LibComponent
import { GnxAuthComponent } from './components/gnx-auth.component';
import { CookieService } from "ngx-cookie-service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GnxApplyTokenInterceptor } from "./interceptors/gnx-apply-token-interceptor";
import { GnxRefreshTokenInterceptor } from "./interceptors/gnx-refresh-token-interceptor";
import { GnxAuthService } from "./gnx-auth.service";
export class GnxAuthModule {
    /**
     * @param {?} environment
     * @param {?} translatorService
     * @return {?}
     */
    static forRoot(environment, translatorService) {
        return {
            ngModule: GnxAuthModule,
            providers: [
                GnxAuthService,
                { provide: 'TranslatorService', useClass: translatorService },
                {
                    provide: 'env',
                    useValue: environment
                }
            ]
        };
    }
}
GnxAuthModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GnxAuthComponent
                ],
                imports: [
                    BrowserModule,
                ],
                exports: [
                    GnxAuthComponent
                ],
                providers: [
                    CookieService,
                    { provide: HTTP_INTERCEPTORS, useClass: GnxApplyTokenInterceptor, multi: true },
                    { provide: HTTP_INTERCEPTORS, useClass: GnxRefreshTokenInterceptor, multi: true },
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ254LWF1dGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdueC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2dueC1hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUV4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDeEYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBbUJsRCxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBRWpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBZ0IsRUFBRSxpQkFBc0I7UUFFNUQsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxjQUFjO2dCQUNkLEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQztnQkFDM0Q7b0JBQ0UsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBL0JGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osZ0JBQWdCO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtpQkFDZDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO2lCQUNqQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsYUFBYTtvQkFDYixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztvQkFDN0UsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7aUJBQ2hGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuLy8gTGliQ29tcG9uZW50XHJcbmltcG9ydCB7R254QXV0aENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2dueC1hdXRoLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Q29va2llU2VydmljZX0gZnJvbSBcIm5neC1jb29raWUtc2VydmljZVwiO1xyXG5pbXBvcnQge0hUVFBfSU5URVJDRVBUT1JTfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHtHbnhBcHBseVRva2VuSW50ZXJjZXB0b3J9IGZyb20gXCIuL2ludGVyY2VwdG9ycy9nbngtYXBwbHktdG9rZW4taW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IHtHbnhSZWZyZXNoVG9rZW5JbnRlcmNlcHRvcn0gZnJvbSBcIi4vaW50ZXJjZXB0b3JzL2dueC1yZWZyZXNoLXRva2VuLWludGVyY2VwdG9yXCI7XHJcbmltcG9ydCB7R254QXV0aFNlcnZpY2V9IGZyb20gXCIuL2dueC1hdXRoLnNlcnZpY2VcIjtcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgR254QXV0aENvbXBvbmVudFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEdueEF1dGhDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ29va2llU2VydmljZSxcclxuICAgIHtwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEdueEFwcGx5VG9rZW5JbnRlcmNlcHRvciwgbXVsdGk6IHRydWV9LFxyXG4gICAge3Byb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogR254UmVmcmVzaFRva2VuSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlfSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHbnhBdXRoTW9kdWxlIHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGVudmlyb25tZW50OiBhbnksIHRyYW5zbGF0b3JTZXJ2aWNlOiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogR254QXV0aE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR254QXV0aFNlcnZpY2UsXHJcbiAgICAgICAge3Byb3ZpZGU6ICdUcmFuc2xhdG9yU2VydmljZScsIHVzZUNsYXNzOiB0cmFuc2xhdG9yU2VydmljZX0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogJ2VudicsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogZW52aXJvbm1lbnRcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==