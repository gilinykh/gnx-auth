import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// LibComponent
import {GnxAuthComponent} from './components/gnx-auth.component';
import {CookieService} from "ngx-cookie-service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {GnxApplyTokenInterceptor} from "./interceptors/gnx-apply-token-interceptor";
import {GnxRefreshTokenInterceptor} from "./interceptors/gnx-refresh-token-interceptor";
import {GnxAuthService} from "./gnx-auth.service";


@NgModule({
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
    {provide: HTTP_INTERCEPTORS, useClass: GnxApplyTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: GnxRefreshTokenInterceptor, multi: true},
  ]
})
export class GnxAuthModule {

  public static forRoot(environment: any, translatorService: any): ModuleWithProviders {

    return {
      ngModule: GnxAuthModule,
      providers: [
        GnxAuthService,
        {provide: 'TranslatorService', useClass: translatorService},
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
