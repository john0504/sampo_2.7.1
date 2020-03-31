import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  AlertController,
  AlertOptions,
  IonicPage,
  NavController,
  ViewController
} from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import {
  AppTasks,
  HttpError,
  NetworkError,
  StateStore,
} from 'app-engine';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';

import { PopupService } from '../../providers/popup-service';
import { CheckNetworkService } from '../../providers/check-network';

@IonicPage()
@Component({
  selector: 'page-app-start',
  templateUrl: 'app-start.html'
})
export class AppStartPage {

  private subs: Array<Subscription>;
  private account;

  pwV = /^((?!.*\s)(?=[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).{8,20})$/;
  login: { username?: string, password?: string } = {};

  iconName: string = "eye";
  inputType: string = "password";
  showPassword: boolean = false;

  constructor(
    private appTasks: AppTasks,
    private popupService: PopupService,
    private stateStore: StateStore,
    private tracker: TrackService,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public themeService: ThemeService,
    public viewCtrl: ViewController,
    public checkNetworkService: CheckNetworkService,
  ) {
    this.subs = [];
  }

  ionViewDidLoad() {
    this.checkNetworkService.pause();
  }

  ionViewWillUnload() {
    this.checkNetworkService.resume();
  }

  ionViewWillEnter() {
    this.subs.push(
      this.stateStore.account$
        .subscribe((account) => {
          this.account = account;
          if (account && !account.isOAuth) {
            this.login.username = account.account;
          }
        })
    );
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  ionViewDidLeave() {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs.length = 0;
  }

  isUserLoggedIn() {
    return this.account && this.account.isLoggedIn;
  }

  onLogin(form) {
    if (form.valid) {
      const loggingContent = this.translate.instant('APP_START.LOGGING_IN');
      const loginPromise = this.popupService.loadingPopup(
        this.appTasks.loginTask(this.login.username, this.login.password),
        { content: loggingContent },
      );

      loginPromise
        .then(() => {
          this.tracker.mixpanel.identify(this.login.username);
          this.tracker.mixpanel.people.set({
            $name: this.login.username,
            $last_login: new Date(),
          });
          this.tracker.track('User_Logged_In', { account: this.login.username });
        })
        .catch(e => {
          let alertOptions: AlertOptions;
          const alertOK = this.translate.instant('APP_START.OK');
          const alertTryAgain = this.translate.instant('APP_START.TRY_AGAIN_LATER');
          if (e instanceof HttpError) {
            const alertTitle = this.translate.instant('APP_START.ISSUE_SIGNING_TITLE');
            const alertMsg = this.translate.instant('APP_START.ISSUE_SIGNING_MSG');
            alertOptions = {
              title: alertTitle,
              message: alertMsg,
              buttons: [alertOK],
            };
          } else if (e instanceof NetworkError) {
            const alertTitle = this.translate.instant('APP_START.NETWORK_ERROR_TITLE');
            alertOptions = {
              title: alertTitle,
              message: alertTryAgain,
              buttons: [alertOK],
            };
          } else {
            const alertTitle = this.translate.instant('APP_START.UNKNOWN_ERROR_TITLE');
            alertOptions = {
              title: alertTitle,
              message: alertTryAgain,
              buttons: [alertOK],
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

  goSignup() {
    this.tracker.track('Click', {method: 'goSignup'});
    this.navCtrl.push('SignupPage');
  }

  goForgotPassword() {
    this.tracker.track('Click', {method: 'goForgotPassword'});
    this.navCtrl.push('ForgotPasswordPage');
  }

  goLogin() {
    this.tracker.track('Click', {method: 'goLogin'});
    this.navCtrl.push('LoginPage');
  }

  doLogout() {
    this.tracker.track('Click', {method: 'doLogout'});
    this.appTasks.logoutTask();
  }
}
