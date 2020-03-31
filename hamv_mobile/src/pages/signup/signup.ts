import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  AlertController,
  AlertOptions,
  IonicPage,
  NavController,
  ViewController
} from 'ionic-angular';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';

import {
  AppTasks,
  HttpError,
  NetworkError,
  TimeoutError,
} from 'app-engine';

import { PopupService } from '../../providers/popup-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  userV = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}/i;
  pwV = /^((?!.*\s)(?=[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).{8,20})$/;
  signup: { username?: string, password?: string } = {};
  usernameF: boolean = false;
  passwordF: boolean = false;
  pwF: boolean = false;
  userConsent: boolean = false;

  iconName: string = "eye";
  inputType: string = "password";
  showPassword: boolean = false;

  constructor(
    private appTasks: AppTasks,
    private popupService: PopupService,
    private tracker: TrackService,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public themeService: ThemeService,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  onSignup(form) {
    if (form.valid && this.userConsent) {
      if (!this.pwV.test(this.signup.password)) {
        this.alertCtrl
          .create({
            title: this.translate.instant('SIGNUP.NOT_VALID_TITLE'),
            message: this.translate.instant('SIGNUP.NOT_VALID_MSG'),
            buttons: [this.translate.instant('SIGNUP.OK')],
          })
          .present();
        return;
      }
      const account = this.signup.username.trim();
      const pw = this.signup.password.trim();
      const registerPromise = this.appTasks.registerTask(account, pw);

      this.popupService
        .loadingPopup(registerPromise, {
          content: this.translate.instant('SIGNUP.CREATING_ACCOUNT')
        })
        .then(() => {
          this.tracker.mixpanel.identify(this.signup.username);
          this.tracker.mixpanel.people.set({
            $name: this.signup.username,
            $created: new Date(),
            $last_login: new Date(),
          });
          this.tracker.track('User_Signed_Up', { account: this.signup.username });
        })
        .catch(e => {
          let alertOptions: AlertOptions;
          if (e instanceof HttpError) {
            alertOptions = {
              title: this.translate.instant('SIGNUP.USER_ALREADY_EXISTS'),
              message: this.translate.instant('SIGNUP.CHECK_SETTINGS'),
              buttons: [this.translate.instant('SIGNUP.OK')],
            };
          } else if (e instanceof NetworkError || e instanceof TimeoutError) {
            alertOptions = {
              title: this.translate.instant('SIGNUP.ISSUE_HAPPENED_TITLE'),
              message: this.translate.instant('SIGNUP.CHK_NETWORK_MSG'),
              buttons: [this.translate.instant('SIGNUP.OK')],
            };
          } else {
            alertOptions = {
              title: this.translate.instant('SIGNUP.ISSUE_HAPPENED_TITLE'),
              message: this.translate.instant('SIGNUP.CHK_SETTINGS_MSG'),
              buttons: [this.translate.instant('SIGNUP.OK')],
            };
          }
          if (alertOptions) {
            this.alertCtrl.create(alertOptions).present();
          }
        });
    }
  }

  onShowHidePassword() {
    this.tracker.track('Click', {method: 'onShowHidePassword'});
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType = "text";
      this.iconName = "eye-off";
    }
    else {
      this.inputType = "password";
      this.iconName = "eye";
    }
  }

}
