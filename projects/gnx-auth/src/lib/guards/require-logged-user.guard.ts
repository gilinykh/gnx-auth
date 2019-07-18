import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {GnxAuthService} from "../gnx-auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class RequireLoggedUserGuard implements CanActivate {
  constructor(public auth: GnxAuthService, public router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.getToken().pipe(
      map(token => {
        if (!token) {
          this.auth.redirectToLoginPage();
          return false;
        }
        return true;
      }),
    );
  }
}
