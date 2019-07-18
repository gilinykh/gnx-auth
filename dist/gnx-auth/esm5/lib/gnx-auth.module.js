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
var GnxAuthModule = /** @class */ (function () {
    function GnxAuthModule() {
    }
    /**
     * @param {?} environment
     * @param {?} translatorService
     * @return {?}
     */
    GnxAuthModule.forRoot = /**
     * @param {?} environment
     * @param {?} translatorService
     * @return {?}
     */
    function (environment, translatorService) {
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
    };
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
    return GnxAuthModule;
}());
export { GnxAuthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ254LWF1dGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdueC9hdXRoLyIsInNvdXJjZXMiOlsibGliL2dueC1hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUV4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDeEYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBR2xEO0lBQUE7SUFnQ0EsQ0FBQzs7Ozs7O0lBZGUscUJBQU87Ozs7O0lBQXJCLFVBQXNCLFdBQWdCLEVBQUUsaUJBQXNCO1FBRTVELE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsY0FBYztnQkFDZCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUM7Z0JBQzNEO29CQUNFLE9BQU8sRUFBRSxLQUFLO29CQUNkLFFBQVEsRUFBRSxXQUFXO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQS9CRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjtxQkFDakI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGFBQWE7d0JBQ2IsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7d0JBQzdFLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO3FCQUNoRjtpQkFDRjs7SUFpQkQsb0JBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQWhCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbi8vIExpYkNvbXBvbmVudFxyXG5pbXBvcnQge0dueEF1dGhDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9nbngtYXV0aC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0Nvb2tpZVNlcnZpY2V9IGZyb20gXCJuZ3gtY29va2llLXNlcnZpY2VcIjtcclxuaW1wb3J0IHtIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7R254QXBwbHlUb2tlbkludGVyY2VwdG9yfSBmcm9tIFwiLi9pbnRlcmNlcHRvcnMvZ254LWFwcGx5LXRva2VuLWludGVyY2VwdG9yXCI7XHJcbmltcG9ydCB7R254UmVmcmVzaFRva2VuSW50ZXJjZXB0b3J9IGZyb20gXCIuL2ludGVyY2VwdG9ycy9nbngtcmVmcmVzaC10b2tlbi1pbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQge0dueEF1dGhTZXJ2aWNlfSBmcm9tIFwiLi9nbngtYXV0aC5zZXJ2aWNlXCI7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEdueEF1dGhDb21wb25lbnRcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBHbnhBdXRoQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENvb2tpZVNlcnZpY2UsXHJcbiAgICB7cHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBHbnhBcHBseVRva2VuSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlfSxcclxuICAgIHtwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEdueFJlZnJlc2hUb2tlbkludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZX0sXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR254QXV0aE1vZHVsZSB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55LCB0cmFuc2xhdG9yU2VydmljZTogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEdueEF1dGhNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdueEF1dGhTZXJ2aWNlLFxyXG4gICAgICAgIHtwcm92aWRlOiAnVHJhbnNsYXRvclNlcnZpY2UnLCB1c2VDbGFzczogdHJhbnNsYXRvclNlcnZpY2V9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6ICdlbnYnLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGVudmlyb25tZW50XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=