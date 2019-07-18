/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from "@angular/router";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-cookie-service";
import * as i3 from "@angular/router";
export class GnxAuthService {
    /**
     * @param {?} http
     * @param {?} cookieService
     * @param {?} router
     * @param {?} route
     * @param {?} env
     */
    constructor(http, cookieService, router, route, env) {
        this.http = http;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.env = env;
        this.AUTH_SERVER_TOKEN_ENDPOINT = '/oauth/token';
        this.AUTH_SERVER_LOGIN_ENDPOINT = '/oauth/authorize';
        this.AUTH_SERVER_SIGN_UP_ENDPOINT = '/registration';
        this.AUTH_SERVER_LANGUAGE_ENDPOINT = '/api/accounts/current/locale';
        this.ACCESS_TOKEN_COOKIE_NAME = 'access_token';
        this.REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
        this.COOKIE_PATH = '/';
        this.initialized = false;
        this.jwtHelper = new JwtHelperService();
        this.accessToken$ = new ReplaySubject(1);
        this.clientId = env.clientId;
        this.authServerUrl = env.authServerUrl;
        this.cookieDomainName = env.cookieDomainName;
    }
    /**
     * @param {?} translatorService
     * @return {?}
     */
    setTranslatorService(translatorService) {
        this.translatorService = translatorService;
    }
    /**
     * @return {?}
     */
    init() {
        // intercept request with 'code' param to get token by the code
        /** @type {?} */
        let matchings = window.location.search.match(/code=(.+?)(&.+)?$/);
        /** @type {?} */
        let code = matchings ? matchings[1] : null;
        if (code) {
            this.getTokensByCode(code);
        }
        else {
            this.tryToGetTokensFromCookieOrStorage().subscribe();
        }
        this.initialized = true;
    }
    /**
     * @return {?}
     */
    getToken() {
        if (!this.initialized) {
            this.init();
        }
        return this.accessToken$.asObservable();
    }
    /**
     * @param {?} code
     * @return {?}
     */
    getTokensByCode(code) {
        /** @type {?} */
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.clientId);
        params.append('redirect_uri', this.getRedirectUri());
        params.append('code', code);
        /** @type {?} */
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + btoa(this.clientId + ':secret')
        });
        this.http.post(this.authServerUrl + this.AUTH_SERVER_TOKEN_ENDPOINT, params.toString(), { headers: headers }).subscribe((/**
         * @param {?} tokenData
         * @return {?}
         */
        tokenData => {
            this.saveTokens(tokenData);
            this.accessToken$.next(this.accessToken);
            this.removeCodeParamAndNavigateToTheSamePage().then();
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => this.accessToken$.next(null)));
    }
    /**
     * @return {?}
     */
    getAccessTokenByRefreshToken() {
        return this.tryToGetTokensFromCookieOrStorage().pipe(switchMap((/**
         * @param {?} val
         * @return {?}
         */
        val => this.getToken())));
    }
    /**
     * @return {?}
     */
    redirectToLoginPage() {
        window.location.href = `${this.authServerUrl}${this.AUTH_SERVER_LOGIN_ENDPOINT}` +
            `?response_type=code&client_id=${this.clientId}&redirect_uri=${this.getRedirectUri()}`;
    }
    /**
     * @return {?}
     */
    redirectToSignUpPage() {
        window.location.href = `${this.authServerUrl}${this.AUTH_SERVER_SIGN_UP_ENDPOINT}`;
    }
    /**
     * @return {?}
     */
    logout() {
        this.deleteTokens();
        this.accessToken$.next(null);
        this.navigateToTheSamePage().then();
    }
    /**
     * @return {?}
     */
    retrieveUserLanguageFromServer() {
        this.http.get(this.authServerUrl + this.AUTH_SERVER_LANGUAGE_ENDPOINT)
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res && res.locale !== this.translatorService.getCurrentLang().toLowerCase()) {
                this.userLanguage = res.locale;
                this.translatorService.useLanguage(this.userLanguage);
            }
        }));
    }
    /**
     * @return {?}
     */
    setDefaultUserLanguage() {
        this.userLanguage = this.translatorService.getCurrentLang();
    }
    /**
     * @private
     * @return {?}
     */
    tryToGetTokensFromCookieOrStorage() {
        if (this.isValidToken(this.accessToken)) {
            this.accessToken$.next(this.accessToken);
            return of(true);
        }
        // look for access_token in cookie
        /** @type {?} */
        let encodedToken = this.cookieService.get(this.ACCESS_TOKEN_COOKIE_NAME);
        /** @type {?} */
        let decodedToken = this.decodeToken(encodedToken);
        if (this.isValidToken(decodedToken)) {
            this.accessToken = decodedToken;
            this.accessToken$.next(decodedToken);
            return of(true);
        }
        else {
            this.removeAccessTokenFromCookie();
        }
        // look for a refresh token in cookie
        /** @type {?} */
        let refreshToken;
        if (this.refreshToken) {
            refreshToken = this.refreshToken;
        }
        else {
            refreshToken = this.decodeToken(this.cookieService.get(this.REFRESH_TOKEN_COOKIE_NAME));
        }
        if (this.isValidToken(refreshToken)) {
            return this.getNewTokensByRefreshToken(refreshToken).pipe(tap((/**
             * @param {?} tokenData
             * @return {?}
             */
            tokenData => {
                this.saveTokens(tokenData);
                this.accessToken$.next(this.accessToken);
            })), map((/**
             * @param {?} tokenData
             * @return {?}
             */
            tokenData => !!tokenData)), catchError((/**
             * @param {?} err
             * @return {?}
             */
            err => {
                this.removeRefreshTokenFromCookie();
                this.accessToken$.next(null);
                return of(false);
            })));
        }
        else {
            this.removeRefreshTokenFromCookie();
        }
        this.accessToken$.next(null);
        return of(false);
    }
    /**
     * @private
     * @return {?}
     */
    removeCodeParamAndNavigateToTheSamePage() {
        /** @type {?} */
        let queryParams = {};
        /** @type {?} */
        let params = this.route.snapshot.queryParamMap;
        params.keys.forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            if (k !== 'code') {
                queryParams[k] = params.get(k);
            }
        }));
        /** @type {?} */
        let currentUrlPath = this.getCurrentUrlPath();
        return this.router.navigate([currentUrlPath], {
            relativeTo: this.route,
            queryParams: queryParams,
        });
    }
    /**
     * @private
     * @return {?}
     */
    navigateToTheSamePage() {
        /** @type {?} */
        let queryParams = {};
        /** @type {?} */
        let params = this.route.snapshot.queryParamMap;
        params.keys.forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            queryParams[k] = params.get(k);
        }));
        /** @type {?} */
        let currentUrlPath = this.getCurrentUrlPath();
        return this.router.navigate([currentUrlPath], {
            relativeTo: this.route,
            queryParams: queryParams,
        });
    }
    /**
     * @private
     * @param {?} tokenData
     * @return {?}
     */
    saveTokens(tokenData) {
        if (tokenData) {
            /** @type {?} */
            let decodedAccessToken = this.decodeToken(tokenData.access_token);
            /** @type {?} */
            let acExpireDate = new Date(decodedAccessToken.exp * 1000);
            this.cookieService.set(this.ACCESS_TOKEN_COOKIE_NAME, tokenData.access_token, acExpireDate, this.COOKIE_PATH, this.cookieDomainName);
            this.accessToken = decodedAccessToken;
            /** @type {?} */
            let decodedRefreshToken = this.decodeToken(tokenData.refresh_token);
            /** @type {?} */
            let rtExpireDate = new Date(decodedRefreshToken.exp * 1000);
            this.cookieService.set(this.REFRESH_TOKEN_COOKIE_NAME, tokenData.refresh_token, rtExpireDate, this.COOKIE_PATH, this.cookieDomainName);
            this.refreshToken = this.decodeToken(tokenData.refresh_token);
        }
    }
    /**
     * @private
     * @return {?}
     */
    getCurrentUrlPath() {
        /** @type {?} */
        let url = this.router.url;
        if (url.indexOf('?') > 0) {
            url = url.substr(0, url.indexOf('?'));
        }
        return url;
    }
    /**
     * @private
     * @param {?} refreshToken
     * @return {?}
     */
    getNewTokensByRefreshToken(refreshToken) {
        /** @type {?} */
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + btoa(this.clientId + ':secret')
        });
        /** @type {?} */
        let body = new URLSearchParams();
        body.set('grant_type', 'refresh_token');
        body.set('refresh_token', refreshToken.encodedToken);
        return this.http.post(this.authServerUrl + this.AUTH_SERVER_TOKEN_ENDPOINT, body.toString(), { headers: headers });
    }
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    isValidToken(token) {
        if (!token) {
            return false;
        }
        /** @type {?} */
        let expirationSeconds = token.exp;
        return expirationSeconds && (new Date().getTime() < expirationSeconds * 1000);
    }
    /**
     * @private
     * @return {?}
     */
    deleteTokens() {
        this.removeAccessTokenFromCookie();
        this.accessToken = null;
        this.removeRefreshTokenFromCookie();
        this.refreshToken = null;
    }
    /**
     * @private
     * @return {?}
     */
    removeAccessTokenFromCookie() {
        /** @type {?} */
        let cookieValue = this.cookieService.get(this.ACCESS_TOKEN_COOKIE_NAME);
        if (cookieValue) {
            /** @type {?} */
            let expireDate = new Date(0);
            this.cookieService.set(this.ACCESS_TOKEN_COOKIE_NAME, cookieValue, expireDate, this.COOKIE_PATH, this.cookieDomainName);
        }
    }
    /**
     * @private
     * @return {?}
     */
    removeRefreshTokenFromCookie() {
        /** @type {?} */
        let cookieValue = this.cookieService.get(this.REFRESH_TOKEN_COOKIE_NAME);
        if (cookieValue) {
            /** @type {?} */
            let expireDate = new Date(0);
            this.cookieService.set(this.REFRESH_TOKEN_COOKIE_NAME, cookieValue, expireDate, this.COOKIE_PATH, this.cookieDomainName);
        }
    }
    /**
     * @private
     * @param {?} encodedToken
     * @return {?}
     */
    decodeToken(encodedToken) {
        if (!encodedToken) {
            return null;
        }
        /** @type {?} */
        let decodedToken = (/** @type {?} */ (this.jwtHelper.decodeToken(encodedToken)));
        if (decodedToken) {
            decodedToken.encodedToken = encodedToken;
        }
        return decodedToken;
    }
    /**
     * @private
     * @return {?}
     */
    getRedirectUri() {
        return window.location.href.replace(/^(http[s]?:\/\/[a-zA-Z\\.:0-9]+)(\/.*)$/, '$1');
    }
}
GnxAuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
GnxAuthService.ctorParameters = () => [
    { type: HttpClient },
    { type: CookieService },
    { type: Router },
    { type: ActivatedRoute },
    { type: undefined, decorators: [{ type: Inject, args: ['env',] }] }
];
/** @nocollapse */ GnxAuthService.ngInjectableDef = i0.defineInjectable({ factory: function GnxAuthService_Factory() { return new GnxAuthService(i0.inject(i1.HttpClient), i0.inject(i2.CookieService), i0.inject(i3.Router), i0.inject(i3.ActivatedRoute), i0.inject("env")); }, token: GnxAuthService, providedIn: "root" });
if (false) {
    /** @type {?} */
    GnxAuthService.prototype.AUTH_SERVER_TOKEN_ENDPOINT;
    /** @type {?} */
    GnxAuthService.prototype.AUTH_SERVER_LOGIN_ENDPOINT;
    /** @type {?} */
    GnxAuthService.prototype.AUTH_SERVER_SIGN_UP_ENDPOINT;
    /** @type {?} */
    GnxAuthService.prototype.AUTH_SERVER_LANGUAGE_ENDPOINT;
    /** @type {?} */
    GnxAuthService.prototype.ACCESS_TOKEN_COOKIE_NAME;
    /** @type {?} */
    GnxAuthService.prototype.REFRESH_TOKEN_COOKIE_NAME;
    /** @type {?} */
    GnxAuthService.prototype.COOKIE_PATH;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.initialized;
    /** @type {?} */
    GnxAuthService.prototype.clientId;
    /** @type {?} */
    GnxAuthService.prototype.authServerUrl;
    /** @type {?} */
    GnxAuthService.prototype.cookieDomainName;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.jwtHelper;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.accessToken$;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.accessToken;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.refreshToken;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.translatorService;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.userLanguage;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.cookieService;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.route;
    /**
     * @type {?}
     * @private
     */
    GnxAuthService.prototype.env;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ254LWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnbngvYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9nbngtYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBYSxFQUFFLEVBQUUsYUFBYSxFQUFVLE1BQU0sTUFBTSxDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLdkQsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7O0lBeUJ6QixZQUFvQixJQUFnQixFQUNoQixhQUE0QixFQUM1QixNQUFjLEVBQ2QsS0FBcUIsRUFDTixHQUFHO1FBSmxCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ04sUUFBRyxHQUFILEdBQUcsQ0FBQTtRQTVCN0IsK0JBQTBCLEdBQUcsY0FBYyxDQUFDO1FBQzVDLCtCQUEwQixHQUFHLGtCQUFrQixDQUFDO1FBQ2hELGlDQUE0QixHQUFHLGVBQWUsQ0FBQztRQUMvQyxrQ0FBNkIsR0FBRyw4QkFBOEIsQ0FBQztRQUMvRCw2QkFBd0IsR0FBRyxjQUFjLENBQUM7UUFDMUMsOEJBQXlCLEdBQUcsZUFBZSxD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cm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIG9mLCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIHN3aXRjaE1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7VG9rZW4sIFRva2VuRGF0YSwgVHJhbnNsYXRlYWJsZX0gZnJvbSAnLi9nbngtbW9kZWxzJztcclxuaW1wb3J0IHtDb29raWVTZXJ2aWNlfSBmcm9tIFwibmd4LWNvb2tpZS1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Snd0SGVscGVyU2VydmljZX0gZnJvbSAnQGF1dGgwL2FuZ3VsYXItand0JztcclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHbnhBdXRoU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgQVVUSF9TRVJWRVJfVE9LRU5fRU5EUE9JTlQgPSAnL29hdXRoL3Rva2VuJztcclxuICByZWFkb25seSBBVVRIX1NFUlZFUl9MT0dJTl9FTkRQT0lOVCA9ICcvb2F1dGgvYXV0aG9yaXplJztcclxuICByZWFkb25seSBBVVRIX1NFUlZFUl9TSUdOX1VQX0VORFBPSU5UID0gJy9yZWdpc3RyYXRpb24nO1xyXG4gIHJlYWRvbmx5IEFVVEhfU0VSVkVSX0xBTkdVQUdFX0VORFBPSU5UID0gJy9hcGkvYWNjb3VudHMvY3VycmVudC9sb2NhbGUnO1xyXG4gIHJlYWRvbmx5IEFDQ0VTU19UT0tFTl9DT09LSUVfTkFNRSA9ICdhY2Nlc3NfdG9rZW4nO1xyXG4gIHJlYWRvbmx5IFJFRlJFU0hfVE9LRU5fQ09PS0lFX05BTUUgPSAncmVmcmVzaF90b2tlbic7XHJcbiAgcmVhZG9ubHkgQ09PS0lFX1BBVEggPSAnLyc7XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICBhdXRoU2VydmVyVXJsOiBzdHJpbmc7XHJcbiAgY29va2llRG9tYWluTmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGp3dEhlbHBlciA9IG5ldyBKd3RIZWxwZXJTZXJ2aWNlKCk7XHJcblxyXG4gIHByaXZhdGUgYWNjZXNzVG9rZW4kOiBTdWJqZWN0PFRva2VuPiA9IG5ldyBSZXBsYXlTdWJqZWN0PFRva2VuPigxKTtcclxuICBwcml2YXRlIGFjY2Vzc1Rva2VuOiBUb2tlbjtcclxuICBwcml2YXRlIHJlZnJlc2hUb2tlbjogVG9rZW47XHJcblxyXG4gIHByaXZhdGUgdHJhbnNsYXRvclNlcnZpY2U6IFRyYW5zbGF0ZWFibGU7XHJcblxyXG4gIHByaXZhdGUgdXNlckxhbmd1YWdlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICBASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudikge1xyXG5cclxuICAgIHRoaXMuY2xpZW50SWQgPSBlbnYuY2xpZW50SWQ7XHJcbiAgICB0aGlzLmF1dGhTZXJ2ZXJVcmwgPSBlbnYuYXV0aFNlcnZlclVybDtcclxuICAgIHRoaXMuY29va2llRG9tYWluTmFtZSA9IGVudi5jb29raWVEb21haW5OYW1lO1xyXG4gIH1cclxuXHJcbiAgc2V0VHJhbnNsYXRvclNlcnZpY2UodHJhbnNsYXRvclNlcnZpY2U6IFRyYW5zbGF0ZWFibGUpIHtcclxuICAgIHRoaXMudHJhbnNsYXRvclNlcnZpY2UgPSB0cmFuc2xhdG9yU2VydmljZTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICAvLyBpbnRlcmNlcHQgcmVxdWVzdCB3aXRoICdjb2RlJyBwYXJhbSB0byBnZXQgdG9rZW4gYnkgdGhlIGNvZGVcclxuICAgIGxldCBtYXRjaGluZ3MgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKC9jb2RlPSguKz8pKCYuKyk/JC8pO1xyXG4gICAgbGV0IGNvZGUgPSBtYXRjaGluZ3MgPyBtYXRjaGluZ3NbMV0gOiBudWxsO1xyXG4gICAgaWYgKGNvZGUpIHtcclxuICAgICAgdGhpcy5nZXRUb2tlbnNCeUNvZGUoY29kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyeVRvR2V0VG9rZW5zRnJvbUNvb2tpZU9yU3RvcmFnZSgpLnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBnZXRUb2tlbigpOiBPYnNlcnZhYmxlPFRva2VuPiB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hY2Nlc3NUb2tlbiQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRUb2tlbnNCeUNvZGUoY29kZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgICBwYXJhbXMuYXBwZW5kKCdncmFudF90eXBlJywgJ2F1dGhvcml6YXRpb25fY29kZScpO1xyXG4gICAgcGFyYW1zLmFwcGVuZCgnY2xpZW50X2lkJywgdGhpcy5jbGllbnRJZCk7XHJcbiAgICBwYXJhbXMuYXBwZW5kKCdyZWRpcmVjdF91cmknLCB0aGlzLmdldFJlZGlyZWN0VXJpKCkpO1xyXG4gICAgcGFyYW1zLmFwcGVuZCgnY29kZScsIGNvZGUpO1xyXG5cclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcgKyBidG9hKHRoaXMuY2xpZW50SWQgKyAnOnNlY3JldCcpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmh0dHAucG9zdDxUb2tlbkRhdGE+KHRoaXMuYXV0aFNlcnZlclVybCArIHRoaXMuQVVUSF9TRVJWRVJfVE9LRU5fRU5EUE9JTlQsIHBhcmFtcy50b1N0cmluZygpLFxyXG4gICAgICB7aGVhZGVyczogaGVhZGVyc30pLnN1YnNjcmliZSh0b2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuc2F2ZVRva2Vucyh0b2tlbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW4kLm5leHQodGhpcy5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDb2RlUGFyYW1BbmROYXZpZ2F0ZVRvVGhlU2FtZVBhZ2UoKS50aGVuKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVyciA9PiB0aGlzLmFjY2Vzc1Rva2VuJC5uZXh0KG51bGwpKTtcclxuICB9XHJcblxyXG4gIGdldEFjY2Vzc1Rva2VuQnlSZWZyZXNoVG9rZW4oKTogT2JzZXJ2YWJsZTxUb2tlbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMudHJ5VG9HZXRUb2tlbnNGcm9tQ29va2llT3JTdG9yYWdlKCkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKHZhbCA9PiB0aGlzLmdldFRva2VuKCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVkaXJlY3RUb0xvZ2luUGFnZSgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5hdXRoU2VydmVyVXJsfSR7dGhpcy5BVVRIX1NFUlZFUl9MT0dJTl9FTkRQT0lOVH1gICtcclxuICAgICAgYD9yZXNwb25zZV90eXBlPWNvZGUmY2xpZW50X2lkPSR7dGhpcy5jbGllbnRJZH0mcmVkaXJlY3RfdXJpPSR7dGhpcy5nZXRSZWRpcmVjdFVyaSgpfWA7XHJcbiAgfVxyXG5cclxuICByZWRpcmVjdFRvU2lnblVwUGFnZSgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dGhpcy5hdXRoU2VydmVyVXJsfSR7dGhpcy5BVVRIX1NFUlZFUl9TSUdOX1VQX0VORFBPSU5UfWA7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB0aGlzLmRlbGV0ZVRva2VucygpO1xyXG4gICAgdGhpcy5hY2Nlc3NUb2tlbiQubmV4dChudWxsKTtcclxuICAgIHRoaXMubmF2aWdhdGVUb1RoZVNhbWVQYWdlKCkudGhlbigpO1xyXG4gIH1cclxuXHJcbiAgcmV0cmlldmVVc2VyTGFuZ3VhZ2VGcm9tU2VydmVyKCkge1xyXG4gICAgdGhpcy5odHRwLmdldDx7IGxvY2FsZTogc3RyaW5nIH0+KHRoaXMuYXV0aFNlcnZlclVybCArIHRoaXMuQVVUSF9TRVJWRVJfTEFOR1VBR0VfRU5EUE9JTlQpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzICYmIHJlcy5sb2NhbGUgIT09IHRoaXMudHJhbnNsYXRvclNlcnZpY2UuZ2V0Q3VycmVudExhbmcoKS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICB0aGlzLnVzZXJMYW5ndWFnZSA9IHJlcy5sb2NhbGU7XHJcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0b3JTZXJ2aWNlLnVzZUxhbmd1YWdlKHRoaXMudXNlckxhbmd1YWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVmYXVsdFVzZXJMYW5ndWFnZSgpIHtcclxuICAgIHRoaXMudXNlckxhbmd1YWdlID0gdGhpcy50cmFuc2xhdG9yU2VydmljZS5nZXRDdXJyZW50TGFuZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlUb0dldFRva2Vuc0Zyb21Db29raWVPclN0b3JhZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4odGhpcy5hY2Nlc3NUb2tlbikpIHtcclxuICAgICAgdGhpcy5hY2Nlc3NUb2tlbiQubmV4dCh0aGlzLmFjY2Vzc1Rva2VuKTtcclxuICAgICAgcmV0dXJuIG9mKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvb2sgZm9yIGFjY2Vzc190b2tlbiBpbiBjb29raWVcclxuICAgIGxldCBlbmNvZGVkVG9rZW4gPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuQUNDRVNTX1RPS0VOX0NPT0tJRV9OQU1FKTtcclxuICAgIGxldCBkZWNvZGVkVG9rZW4gPSB0aGlzLmRlY29kZVRva2VuKGVuY29kZWRUb2tlbik7XHJcbiAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4oZGVjb2RlZFRva2VuKSkge1xyXG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gZGVjb2RlZFRva2VuO1xyXG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuJC5uZXh0KGRlY29kZWRUb2tlbik7XHJcbiAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQWNjZXNzVG9rZW5Gcm9tQ29va2llKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbG9vayBmb3IgYSByZWZyZXNoIHRva2VuIGluIGNvb2tpZVxyXG4gICAgbGV0IHJlZnJlc2hUb2tlbjogVG9rZW47XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoVG9rZW4pIHtcclxuICAgICAgcmVmcmVzaFRva2VuID0gdGhpcy5yZWZyZXNoVG9rZW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWZyZXNoVG9rZW4gPSB0aGlzLmRlY29kZVRva2VuKHRoaXMuY29va2llU2VydmljZS5nZXQodGhpcy5SRUZSRVNIX1RPS0VOX0NPT0tJRV9OQU1FKSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4ocmVmcmVzaFRva2VuKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXROZXdUb2tlbnNCeVJlZnJlc2hUb2tlbihyZWZyZXNoVG9rZW4pLnBpcGUoXHJcbiAgICAgICAgdGFwKHRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNhdmVUb2tlbnModG9rZW5EYXRhKTtcclxuICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW4kLm5leHQodGhpcy5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKHRva2VuRGF0YSA9PiAhIXRva2VuRGF0YSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVSZWZyZXNoVG9rZW5Gcm9tQ29va2llKCk7XHJcbiAgICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuJC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVSZWZyZXNoVG9rZW5Gcm9tQ29va2llKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY2Nlc3NUb2tlbiQubmV4dChudWxsKTtcclxuICAgIHJldHVybiBvZihmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUNvZGVQYXJhbUFuZE5hdmlnYXRlVG9UaGVTYW1lUGFnZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGxldCBxdWVyeVBhcmFtczogYW55ID0ge307XHJcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwO1xyXG4gICAgcGFyYW1zLmtleXMuZm9yRWFjaChrID0+IHtcclxuICAgICAgaWYgKGsgIT09ICdjb2RlJykge1xyXG4gICAgICAgIHF1ZXJ5UGFyYW1zW2tdID0gcGFyYW1zLmdldChrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRVcmxQYXRoID0gdGhpcy5nZXRDdXJyZW50VXJsUGF0aCgpO1xyXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFxyXG4gICAgICBbY3VycmVudFVybFBhdGhdLFxyXG4gICAgICB7XHJcbiAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcclxuICAgICAgICBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuYXZpZ2F0ZVRvVGhlU2FtZVBhZ2UoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBsZXQgcXVlcnlQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgbGV0IHBhcmFtcyA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcDtcclxuICAgIHBhcmFtcy5rZXlzLmZvckVhY2goayA9PiB7XHJcbiAgICAgICAgcXVlcnlQYXJhbXNba10gPSBwYXJhbXMuZ2V0KGspO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRVcmxQYXRoID0gdGhpcy5nZXRDdXJyZW50VXJsUGF0aCgpO1xyXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFxyXG4gICAgICBbY3VycmVudFVybFBhdGhdLFxyXG4gICAgICB7XHJcbiAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcclxuICAgICAgICBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYXZlVG9rZW5zKHRva2VuRGF0YTogVG9rZW5EYXRhKSB7XHJcbiAgICBpZiAodG9rZW5EYXRhKSB7XHJcbiAgICAgIGxldCBkZWNvZGVkQWNjZXNzVG9rZW4gPSB0aGlzLmRlY29kZVRva2VuKHRva2VuRGF0YS5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICBsZXQgYWNFeHBpcmVEYXRlID0gbmV3IERhdGUoZGVjb2RlZEFjY2Vzc1Rva2VuLmV4cCAqIDEwMDApO1xyXG4gICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KHRoaXMuQUNDRVNTX1RPS0VOX0NPT0tJRV9OQU1FLCB0b2tlbkRhdGEuYWNjZXNzX3Rva2VuLCBhY0V4cGlyZURhdGUsIHRoaXMuQ09PS0lFX1BBVEgsIHRoaXMuY29va2llRG9tYWluTmFtZSk7XHJcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBkZWNvZGVkQWNjZXNzVG9rZW47XHJcblxyXG4gICAgICBsZXQgZGVjb2RlZFJlZnJlc2hUb2tlbiA9IHRoaXMuZGVjb2RlVG9rZW4odG9rZW5EYXRhLnJlZnJlc2hfdG9rZW4pO1xyXG4gICAgICBsZXQgcnRFeHBpcmVEYXRlID0gbmV3IERhdGUoZGVjb2RlZFJlZnJlc2hUb2tlbi5leHAgKiAxMDAwKTtcclxuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCh0aGlzLlJFRlJFU0hfVE9LRU5fQ09PS0lFX05BTUUsIHRva2VuRGF0YS5yZWZyZXNoX3Rva2VuLCBydEV4cGlyZURhdGUsIHRoaXMuQ09PS0lFX1BBVEgsIHRoaXMuY29va2llRG9tYWluTmFtZSk7XHJcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuID0gdGhpcy5kZWNvZGVUb2tlbih0b2tlbkRhdGEucmVmcmVzaF90b2tlbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEN1cnJlbnRVcmxQYXRoKCkge1xyXG4gICAgbGV0IHVybCA9IHRoaXMucm91dGVyLnVybDtcclxuICAgIGlmICh1cmwuaW5kZXhPZignPycpID4gMCkge1xyXG4gICAgICB1cmwgPSB1cmwuc3Vic3RyKDAsIHVybC5pbmRleE9mKCc/JykpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXROZXdUb2tlbnNCeVJlZnJlc2hUb2tlbihyZWZyZXNoVG9rZW46IFRva2VuKTogT2JzZXJ2YWJsZTxUb2tlbkRhdGE+IHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcgKyBidG9hKHRoaXMuY2xpZW50SWQgKyAnOnNlY3JldCcpXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgYm9keSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgIGJvZHkuc2V0KCdncmFudF90eXBlJywgJ3JlZnJlc2hfdG9rZW4nKTtcclxuICAgIGJvZHkuc2V0KCdyZWZyZXNoX3Rva2VuJywgcmVmcmVzaFRva2VuLmVuY29kZWRUb2tlbik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFRva2VuRGF0YT4odGhpcy5hdXRoU2VydmVyVXJsICsgdGhpcy5BVVRIX1NFUlZFUl9UT0tFTl9FTkRQT0lOVCwgYm9keS50b1N0cmluZygpLCB7aGVhZGVyczogaGVhZGVyc30pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1ZhbGlkVG9rZW4odG9rZW46IFRva2VuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGxldCBleHBpcmF0aW9uU2Vjb25kcyA9IHRva2VuLmV4cDtcclxuICAgIHJldHVybiBleHBpcmF0aW9uU2Vjb25kcyAmJiAobmV3IERhdGUoKS5nZXRUaW1lKCkgPCBleHBpcmF0aW9uU2Vjb25kcyAqIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWxldGVUb2tlbnMoKSB7XHJcbiAgICB0aGlzLnJlbW92ZUFjY2Vzc1Rva2VuRnJvbUNvb2tpZSgpO1xyXG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IG51bGw7XHJcbiAgICB0aGlzLnJlbW92ZVJlZnJlc2hUb2tlbkZyb21Db29raWUoKTtcclxuICAgIHRoaXMucmVmcmVzaFRva2VuID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlQWNjZXNzVG9rZW5Gcm9tQ29va2llKCkge1xyXG4gICAgbGV0IGNvb2tpZVZhbHVlID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldCh0aGlzLkFDQ0VTU19UT0tFTl9DT09LSUVfTkFNRSk7XHJcbiAgICBpZiAoY29va2llVmFsdWUpIHtcclxuICAgICAgbGV0IGV4cGlyZURhdGUgPSBuZXcgRGF0ZSgwKTtcclxuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCh0aGlzLkFDQ0VTU19UT0tFTl9DT09LSUVfTkFNRSwgY29va2llVmFsdWUsIGV4cGlyZURhdGUsIHRoaXMuQ09PS0lFX1BBVEgsIHRoaXMuY29va2llRG9tYWluTmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVJlZnJlc2hUb2tlbkZyb21Db29raWUoKSB7XHJcbiAgICBsZXQgY29va2llVmFsdWUgPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuUkVGUkVTSF9UT0tFTl9DT09LSUVfTkFNRSk7XHJcbiAgICBpZiAoY29va2llVmFsdWUpIHtcclxuICAgICAgbGV0IGV4cGlyZURhdGUgPSBuZXcgRGF0ZSgwKTtcclxuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCh0aGlzLlJFRlJFU0hfVE9LRU5fQ09PS0lFX05BTUUsIGNvb2tpZVZhbHVlLCBleHBpcmVEYXRlLCB0aGlzLkNPT0tJRV9QQVRILCB0aGlzLmNvb2tpZURvbWFpbk5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWNvZGVUb2tlbihlbmNvZGVkVG9rZW46IHN0cmluZyk6IFRva2VuIHtcclxuICAgIGlmICghZW5jb2RlZFRva2VuKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWNvZGVkVG9rZW4gPSB0aGlzLmp3dEhlbHBlci5kZWNvZGVUb2tlbihlbmNvZGVkVG9rZW4pIGFzIFRva2VuO1xyXG4gICAgaWYgKGRlY29kZWRUb2tlbikge1xyXG4gICAgICBkZWNvZGVkVG9rZW4uZW5jb2RlZFRva2VuID0gZW5jb2RlZFRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWNvZGVkVG9rZW47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlZGlyZWN0VXJpKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXihodHRwW3NdPzpcXC9cXC9bYS16QS1aXFxcXC46MC05XSspKFxcLy4qKSQvLCAnJDEnKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==