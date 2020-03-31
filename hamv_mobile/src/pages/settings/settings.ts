import { Component } from '@angular/core';
import { AppTasks } from 'app-engine';
import {
  IonicPage,
  NavController,
} from 'ionic-angular';

import { appConfig } from '../../app/app.config';
import { ViewStateService } from '../../providers/view-state-service';
import { TrackService } from '../../providers/track-service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  appConfig;

  constructor(
    private appTasks: AppTasks,
    private tracker: TrackService,
    public navCtrl: NavController,
    public viewStateService: ViewStateService,
  ) {
    this.appConfig = appConfig;
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  private goHomePage() {
    this.navCtrl.setRoot('HomePage');
  }

  goAmazonEchoPage() {
    this.tracker.track('Click', {method: 'goAmazonEchoPage'});
    this.navCtrl.push('AmazonEchoPage');
  }

  goIftttPage() {
    this.tracker.track('Click', {method: 'goIftttPage'});
    this.navCtrl.push('IftttPage');
  }

  goGoogleHomePage() {
    this.tracker.track('Click', {method: 'goGoogleHomePage'});
    this.navCtrl.push('GoogleHomePage');
  }

  goMyAccountPage() {
    this.tracker.track('Click', {method: 'goMyAccountPage'});
    this.navCtrl.push('MyAccountPage');
  }

  logout() {
    this.tracker.track('Click', {method: 'logout'});
    this.appTasks.logoutTask()
      .then(() => {
        this.viewStateService.clearAll();
        this.goHomePage();
      });
  }
}
