import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Token, TokenData, Translateable} from './gnx-models';
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GnxAuthService {
  readonly AUTH_SERVER_TOKEN_ENDPOINT = '/oauth/token';
  readonly AUTH_SERVER_LOGIN_ENDPOINT = '/oauth/authorize';
  readonly AUTH_SERVER_SIGN_UP_ENDPOINT = '/registration';
  readonly AUTH_SERVER_LANGUAGE_ENDPOINT = '/api/accounts/current/locale';
  readonly ACCESS_TOKEN_COOKIE_NAME = 'access_token';
  readonly REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
  readonly COOKIE_PATH = '/';

  private initialized = false;

  clientId: string;
  authServerUrl: string;
  cookieDomainName: string;

  private jwtHelper = new JwtHelperService();

  private accessToken$: Subject<Token> = new ReplaySubject<Token>(1);
  private accessToken: Token;
  private refreshToken: Token;

  private translatorService: Translateable;

  private userLanguage: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject('env') private env) {

    this.clientId = env.clientId;
    this.authServerUrl = env.authServerUrl;
    this.cookieDomainName = env.cookieDomainName;
  }

  setTranslatorService(translatorService: Translateable) {
    this.translatorService = translatorService;
  }

  init() {
    // intercept request with 'code' param to get token by the code
    let matchings = window.location.search.match(/code=(.+?)(&.+)?$/);
    let code = matchings ? matchings[1] : null;
    if (code) {
      this.getTokensByCode(code);
    } else {
      this.tryToGetTokensFromCookieOrStorage().subscribe();
    }
    this.initialized = true;
  }

  getToken(): Observable<Token> {
    if (!this.initialized) {
      this.init();
    }
    return this.accessToken$.asObservable();
  }

  getTokensByCode(code: string) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.getRedirectUri());
    params.append('code', code);

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.clientId + ':secret')
    });

    this.http.post<TokenData>(this.authServerUrl + this.AUTH_SERVER_TOKEN_ENDPOINT, params.toString(),
      {headers: headers}).subscribe(tokenData => {
        this.saveTokens(tokenData);
        this.accessToken$.next(this.accessToken);
        this.removeCodeParamAndNavigateToTheSamePage().then();
      },
      err => this.accessToken$.next(null));
  }

  getAccessTokenByRefreshToken(): Observable<Token> {
    return this.tryToGetTokensFromCookieOrStorage().pipe(
      switchMap(val => this.getToken())
    );
  }

  redirectToLoginPage() {
    window.location.href = `${this.authServerUrl}${this.AUTH_SERVER_LOGIN_ENDPOINT}` +
      `?response_type=code&client_id=${this.clientId}&redirect_uri=${this.getRedirectUri()}`;
  }

  redirectToSignUpPage() {
    window.location.href = `${this.authServerUrl}${this.AUTH_SERVER_SIGN_UP_ENDPOINT}`;
  }

  logout() {
    this.deleteTokens();
    this.accessToken$.next(null);
    this.navigateToTheSamePage().then();
  }

  retrieveUserLanguageFromServer() {
    this.http.get<{ locale: string }>(this.authServerUrl + this.AUTH_SERVER_LANGUAGE_ENDPOINT)
      .subscribe(res => {
        if (res && res.locale !== this.translatorService.getCurrentLang().toLowerCase()) {
          this.userLanguage = res.locale;
          this.translatorService.useLanguage(this.userLanguage);
        }
      });
  }

  setDefaultUserLanguage() {
    this.userLanguage = this.translatorService.getCurrentLang();
  }

  private tryToGetTokensFromCookieOrStorage(): Observable<boolean> {
    if (this.isValidToken(this.accessToken)) {
      this.accessToken$.next(this.accessToken);
      return of(true);
    }

    // look for access_token in cookie
    let encodedToken = this.cookieService.get(this.ACCESS_TOKEN_COOKIE_NAME);
    let decodedToken = this.decodeToken(encodedToken);
    if (this.isValidToken(decodedToken)) {
      this.accessToken = decodedToken;
      this.accessToken$.next(decodedToken);
      return of(true);
    } else {
      this.removeAccessTokenFromCookie();
    }

    // look for a refresh token in cookie
    let refreshToken: Token;
    if (this.refreshToken) {
      refreshToken = this.refreshToken;
    } else {
      refreshToken = this.decodeToken(this.cookieService.get(this.REFRESH_TOKEN_COOKIE_NAME));
    }
    if (this.isValidToken(refreshToken)) {
      return this.getNewTokensByRefreshToken(refreshToken).pipe(
        tap(tokenData => {
          this.saveTokens(tokenData);
          this.accessToken$.next(this.accessToken);
        }),
        map(tokenData => !!tokenData),
        catchError(err => {
          this.removeRefreshTokenFromCookie();
          this.accessToken$.next(null);
          return of(false);
        })
      );
    } else {
      this.removeRefreshTokenFromCookie();
    }

    this.accessToken$.next(null);
    return of(false);
  }

  private removeCodeParamAndNavigateToTheSamePage(): Promise<boolean> {
    let queryParams: any = {};
    let params = this.route.snapshot.queryParamMap;
    params.keys.forEach(k => {
      if (k !== 'code') {
        queryParams[k] = params.get(k);
      }
    });

    let currentUrlPath = this.getCurrentUrlPath();
    return this.router.navigate(
      [currentUrlPath],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      });
  }

  private navigateToTheSamePage(): Promise<boolean> {
    let queryParams: any = {};
    let params = this.route.snapshot.queryParamMap;
    params.keys.forEach(k => {
        queryParams[k] = params.get(k);
    });

    let currentUrlPath = this.getCurrentUrlPath();
    return this.router.navigate(
      [currentUrlPath],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      });
  }

  private saveTokens(tokenData: TokenData) {
    if (tokenData) {
      let decodedAccessToken = this.decodeToken(tokenData.access_token);
      let acExpireDate = new Date(decodedAccessToken.exp * 1000);
      this.cookieService.set(this.ACCESS_TOKEN_COOKIE_NAME, tokenData.access_token, acExpireDate, this.COOKIE_PATH, this.cookieDomainName);
      this.accessToken = decodedAccessToken;

      let decodedRefreshToken = this.decodeToken(tokenData.refresh_token);
      let rtExpireDate = new Date(decodedRefreshToken.exp * 1000);
      this.cookieService.set(this.REFRESH_TOKEN_COOKIE_NAME, tokenData.refresh_token, rtExpireDate, this.COOKIE_PATH, this.cookieDomainName);
      this.refreshToken = this.decodeToken(tokenData.refresh_token);
    }
  }

  private getCurrentUrlPath() {
    let url = this.router.url;
    if (url.indexOf('?') > 0) {
      url = url.substr(0, url.indexOf('?'))
    }
    return url;
  }

  private getNewTokensByRefreshToken(refreshToken: Token): Observable<TokenData> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.clientId + ':secret')
    });

    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken.encodedToken);

    return this.http.post<TokenData>(this.authServerUrl + this.AUTH_SERVER_TOKEN_ENDPOINT, body.toString(), {headers: headers});
  }

  private isValidToken(token: Token): boolean {
    if (!token) {
      return false;
    }
    let expirationSeconds = token.exp;
    return expirationSeconds && (new Date().getTime() < expirationSeconds * 1000);
  }

  private deleteTokens() {
    this.removeAccessTokenFromCookie();
    this.accessToken = null;
    this.removeRefreshTokenFromCookie();
    this.refreshToken = null;
  }

  private removeAccessTokenFromCookie() {
    let cookieValue = this.cookieService.get(this.ACCESS_TOKEN_COOKIE_NAME);
    if (cookieValue) {
      let expireDate = new Date(0);
      this.cookieService.set(this.ACCESS_TOKEN_COOKIE_NAME, cookieValue, expireDate, this.COOKIE_PATH, this.cookieDomainName);
    }
  }

  private removeRefreshTokenFromCookie() {
    let cookieValue = this.cookieService.get(this.REFRESH_TOKEN_COOKIE_NAME);
    if (cookieValue) {
      let expireDate = new Date(0);
      this.cookieService.set(this.REFRESH_TOKEN_COOKIE_NAME, cookieValue, expireDate, this.COOKIE_PATH, this.cookieDomainName);
    }
  }

  private decodeToken(encodedToken: string): Token {
    if (!encodedToken) {
      return null;
    }

    let decodedToken = this.jwtHelper.decodeToken(encodedToken) as Token;
    if (decodedToken) {
      decodedToken.encodedToken = encodedToken;
    }

    return decodedToken;
  }

  private getRedirectUri(): string {
    return window.location.href.replace(/^(http[s]?:\/\/[a-zA-Z\\.:0-9]+)(\/.*)$/, '$1');
  }

}
