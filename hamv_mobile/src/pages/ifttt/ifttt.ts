import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { Market } from '@ionic-native/market';

import { appConfig } from '../../app/app.config';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';
import { UtilsProvider } from '../../providers/utils-provider';

@IonicPage()
@Component({
  selector: 'page-ifttt',
  templateUrl: 'ifttt.html',
})
export class IftttPage {

  appConfig;

  constructor(
    private market: Market,
    private platform: Platform,
    private utilsProvider: UtilsProvider,
    private tracker: TrackService,
    public themeService: ThemeService,
  ) {
    this.appConfig = appConfig;
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  openIfttt() {
    this.tracker.track('Click', {method: 'openIfttt'});
    if (this.platform.is('ios')) {
      this.market.open('id660944635');
    } else if (this.platform.is('android')) {
      this.market.open('com.ifttt.ifttt');
    } else {
      const url = 'https://ifttt.com/';
      this.utilsProvider.openLink(url);
    }
  }

  openIftttDoc() {
    this.tracker.track('Click', {method: 'openIftttDoc'});
    const url = 'https://help.ifttt.com/hc/en-us/articles/115010325748-What-is-IFTTT-';
    this.utilsProvider.openLink(url);
  }
}
