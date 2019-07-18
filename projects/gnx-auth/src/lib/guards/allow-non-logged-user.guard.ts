import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {GnxAuthService} from "../gnx-auth.service";
import {Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AllowNonLoggedUserGuard implements CanActivate {
  constructor(public auth: GnxAuthService, public router: Router) {}
  canActivate(): Observable<boolean> {
    return of(null).pipe(
      switchMap(() => this.auth.getToken()),
      map(token => {
        return true;
      }) // always returns true, needed to try to get token from cookie
    );
  }
}
