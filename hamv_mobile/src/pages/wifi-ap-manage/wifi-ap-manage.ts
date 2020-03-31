import { Component } from '@angular/core';
import {
  IonicPage,
  ViewController,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TrackService } from '../../providers/track-service';

const SSID_LIST = '_ssid_list';

@IonicPage()
@Component({
  selector: 'page-wifi-ap-manage',
  templateUrl: 'wifi-ap-manage.html',
})
export class WifiApManagePage {

  ssidList: Array<{ ssid: string, password?: string, sec?: string }>;

  constructor(
    private storage: Storage,
    private tracker: TrackService,
    private viewCtrl: ViewController
  ) {
    this.ssidList = [];
    this.storage.get(SSID_LIST).then(list => this.ssidList = list || this.ssidList);
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  removeSsid(wifiAp) {
    this.tracker.track('Click', {method: 'removeSsid'});
    const index = this.ssidList.findIndex(wifiSetting => wifiAp.ssid === wifiSetting.ssid);
    if (index !== -1) {
      this.ssidList.splice(index, 1);
    }
    this.storage.set(SSID_LIST, this.ssidList);
  }

  closePage() {
    this.tracker.track('Click', {method: 'closePage'});
    this.viewCtrl.dismiss();
  }
}
