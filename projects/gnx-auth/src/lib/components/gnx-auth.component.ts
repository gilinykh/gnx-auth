import {Component, Inject, Input, OnInit} from '@angular/core';
import {GnxAuthService} from "../gnx-auth.service";
import {Translateable} from "../gnx-models";

@Component({
  selector: 'gnx-auth',
  templateUrl: './gnx-auth.component.html',
  styleUrls: ['./gnx-auth.component.scss']
})
export class GnxAuthComponent implements OnInit {

  @Input() redirectToLoginPageIfUserNotLoggedIn = true;

  isLoggedIn: boolean;
  userName: string;
  initialized = false;

  constructor(private service: GnxAuthService,
              @Inject('TranslatorService') public translatorService: Translateable,
              @Inject('env') public env) {
    service.setTranslatorService(translatorService);
  }

  ngOnInit() {
    this.service.getToken().subscribe(token => {
      if (token) {
        this.userName = token.user_name;
        this.isLoggedIn = true;
        this.service.retrieveUserLanguageFromServer();
      } else {
        this.userName = null;
        this.isLoggedIn = false;
        this.service.setDefaultUserLanguage();
      }
      this.initialized = true;
    });
  }

  login() {
    this.service.redirectToLoginPage();
  }

  signUp() {
    this.service.redirectToSignUpPage();
  }

  logout() {
    this.service.logout();
    this.isLoggedIn = false;
  }

  translate(text: string): string {
    return this.translatorService.translate.instant(text);
  }

}
