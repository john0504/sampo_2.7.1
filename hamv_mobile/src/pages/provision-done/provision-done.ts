import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import {
  AppTasks,
  Logger,
} from 'app-engine';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';
import { CheckNetworkService } from '../../providers/check-network';

@IonicPage()
@Component({
  selector: 'page-provision-done',
  templateUrl: 'provision-done.html'
})
export class ProvisionDonePage {

  private unregister;
  private deviceSn;
  newDeviceName: string;

  constructor(
    private appTasks: AppTasks,
    private platform: Platform,
    private tracker: TrackService,
    private translate: TranslateService,
    public checkNetworkService: CheckNetworkService,
    public params: NavParams,
    public navCtrl: NavController,
    public themeService: ThemeService,
  ) {
    this.deviceSn = this.params.get('deviceSn');
    Logger.log('deviceSn => ', this.deviceSn);
  }

  ionViewDidLoad() {
    this.checkNetworkService.pause();
    this.platform.ready()
      .then(() => {
        this.unregister = this.platform.registerBackButtonAction(() => {
          Logger.log('Preventing users from pressing the hardware back button on the phone');
        }, 100);
      });
  }

  ionViewWillUnload() {
    this.checkNetworkService.resume();
    this.unregister && this.unregister();
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  onNext() {
    this.tracker.track('Click', {method: 'onNext'});
    this.navCtrl.pop()
      .then(() => {
        this.saveDevice();
      });
  }

  saveDevice() {
    const displayName = this.newDeviceName && this.newDeviceName.trim()
      ? this.newDeviceName.trim()
      : this.translate.instant('PROVISION_LOADING.MY_NEW_PRODUCT', { productName: this.themeService.productName });

    this.appTasks.wsRequestSetPropertiesTask(this.deviceSn, { displayName });
  }
}
