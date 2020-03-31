import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, LoadingController, NavController, Platform, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppVersion } from '@ionic-native/app-version';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { catchError, delay, repeatWhen, switchMap, first, map } from 'rxjs/operators';
import get from 'lodash/fp/get';
import uniqBy from 'lodash/fp/uniqBy';

import { AppTasks, StateStore } from 'app-engine';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';
import { CheckNetworkService } from '../../providers/check-network';
declare var WifiWizard2: any;
if (!window['WifiWizard2']) {
  window['WifiWizard2'] = {
    scan: () => Promise.resolve(JSON.parse(`[{"level":-29,"SSID":"","BSSID":"80:da:13:4a:77:c9","frequency":2412,"capabilities":"[ESS]","timestamp":13954336316,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-29,"SSID":"","BSSID":"80:da:13:4a:77:c3","frequency":2412,"capabilities":"[RSN-SAE-CCMP]","timestamp":13954336353,"channelWidth":1,"centerFreq0":2422,"centerFreq1":0},{"level":-30,"SSID":"eero-main","BSSID":"80:da:13:4a:77:c6","frequency":2412,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336362,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-35,"SSID":"exosite_spg_5G","BSSID":"e4:f4:c6:00:00:04","frequency":5660,"capabilities":"[WPA2-PSK-CCMP][ESS][WPS]","timestamp":13954336382,"channelWidth":2,"centerFreq0":5690,"centerFreq1":0},{"level":-36,"SSID":"exosite_spg","BSSID":"74:d0:2b:e9:0c:7a","frequency":2417,"capabilities":"[WPA2-PSK-CCMP][ESS][WPS]","timestamp":13954336391,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-37,"SSID":"eero-main","BSSID":"80:da:13:4a:77:c8","frequency":5180,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336399,"channelWidth":2,"centerFreq0":5210,"centerFreq1":0},{"level":-37,"SSID":"","BSSID":"80:da:13:4a:77:c4","frequency":5745,"capabilities":"[RSN-SAE-CCMP]","timestamp":13954336408,"channelWidth":2,"centerFreq0":5775,"centerFreq1":0},{"level":-39,"SSID":"eero-main","BSSID":"80:da:13:4a:77:c7","frequency":5745,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336425,"channelWidth":2,"centerFreq0":5775,"centerFreq1":0},{"level":-39,"SSID":"Chromecast Da.b","BSSID":"fa:8f:ca:32:7b:37","frequency":2437,"capabilities":"[ESS]","timestamp":13954336417,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-40,"SSID":"breezey-B1B7","BSSID":"88:83:5d:98:b1:b7","frequency":2437,"capabilities":"[WPA2-PSK-CCMP][ESS][WPS]","timestamp":13954336431,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-40,"SSID":"","BSSID":"80:da:13:4a:77:ca","frequency":5745,"capabilities":"[ESS]","timestamp":13954336437,"channelWidth":2,"centerFreq0":5775,"centerFreq1":0},{"level":-42,"SSID":"breezey-6626","BSSID":"44:2c:05:80:66:26","frequency":2427,"capabilities":"[ESS]","timestamp":13954336443,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-44,"SSID":"King","BSSID":"c6:a9:cd:1e:10:19","frequency":2427,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336453,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-45,"SSID":"ondy","BSSID":"10:7b:44:da:e8:bb","frequency":2452,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336462,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-46,"SSID":"入口.u","BSSID":"fa:8f:ca:5d:f6:55","frequency":2437,"capabilities":"[ESS]","timestamp":13954336472,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-47,"SSID":"eero-main","BSSID":"80:da:13:12:b4:43","frequency":2412,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336481,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-51,"SSID":"exosite_guest","BSSID":"34:97:f6:64:68:40","frequency":2437,"capabilities":"[WPA2-PSK-CCMP][ESS][WPS]","timestamp":13954336490,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-51,"SSID":"AISYNC_400F01","BSSID":"00:0e:c6:40:0f:01","frequency":2462,"capabilities":"[ESS][WPS]","timestamp":13954336498,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-54,"SSID":"exosite_ps_01_5g","BSSID":"2c:30:33:e9:0b:97","frequency":5825,"capabilities":"[WPA2-PSK-CCMP][ESS][WPS]","timestamp":13954336507,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-56,"SSID":"exosite","BSSID":"9c:65:ee:96:9a:cf","frequency":2462,"capabilities":"[WPA-PSK-TKIP+CCMP][WPA2-PSK-TKIP+CCMP][ESS]","timestamp":13954336515,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-65,"SSID":"eero-main","BSSID":"80:da:13:12:b4:44","frequency":5180,"capabilities":"[WPA2-PSK-CCMP][ESS]","timestamp":13954336522,"channelWidth":2,"centerFreq0":5210,"centerFreq1":0},{"level":-78,"SSID":"exdemo","BSSID":"00:1c:10:99:b3:fe","frequency":2457,"capabilities":"[WPA2-PSK-CCMP+TKIP][ESS]","timestamp":13954336530,"channelWidth":0,"centerFreq0":0,"centerFreq1":0},{"level":-82,"SSID":"exosite_5G","BSSID":"9e:65:ee:96:9a:cf","frequency":5240,"capabilities":"[WPA-PSK-TKIP+CCMP][WPA2-PSK-TKIP+CCMP][ESS]","timestamp":13954336545,"channelWidth":2,"centerFreq0":5210,"centerFreq1":0}]`)),
    disableWifi: () => Promise.resolve(),
    connect: () => Promise.resolve(),
  };
}

@IonicPage()
@Component({
  selector: 'page-device-create',
  templateUrl: 'device-create.html'
})
export class DeviceCreatePage {

  private subs: Array<Subscription>;
  isAndroid: Boolean = this.platform.is('android');
  isIos: Boolean = this.platform.is('ios');
  canContinue: boolean = false;
  isTokenValidated: boolean = false;
  appName: Promise<string>;
  isTokenValid = this.stateStore.account$.pipe(
    first(),
    map(account => {
      const current = Date.now() / 1000 | 0;
      if (account.pTokenBundle &&
        account.pTokenBundle.token &&
        current < account.pTokenBundle.expires_in) {
        return true;
      }
      this.appTasks.wsRequestProvisionTokenTask();
      this.showAlert('token expired');
      return false;
    }),
  );
  wifiAps: Promise<string>;
  selectedSsid: string;

  constructor(
    private platform: Platform,
    private stateStore: StateStore,
    private appTasks: AppTasks,
    private tracker: TrackService,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    public appVersion: AppVersion,
    public checkNetworkService: CheckNetworkService,
    private nativeSettings: OpenNativeSettings,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public themeService: ThemeService,
    public viewCtrl: ViewController,
  ) {
    this.subs = [];
    this.appName = this.appVersion.getAppName();
  }

  ionViewDidLoad() {
    this.checkNetworkService.pause();
  }

  ionViewWillEnter() {
    if (this.isIos) {
      this.subs.push(
        this.queryDeviceInfo()
        .pipe(repeatWhen(attampes => attampes.pipe(delay(3000))))
        .subscribe()
      );
    } else if (this.isAndroid) {
      this.wifiAps = this.getWifiList();
    }
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  private queryDeviceInfo() {
    return defer(() => this.appTasks.queryDeviceInfoTask())
      .pipe(
        switchMap(() => this.isTokenValid),
        catchError(() => of(false)),
        map(result => this.canContinue = result),
      );
  }

  ionViewDidLeave() {
    this.subs && this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs.length = 0;
  }

  ionViewWillUnload() {
    this.checkNetworkService.resume();
  }

  onContinue() {
    if (this.isAndroid) {
      return this.androidConnectProcess();
    } else if (this.isIos) {
      return this.onNext();
    }
  }

  onNext() {
    this.tracker.track('Click', {method: 'onNext'});
    this.navCtrl.push('SsidConfirmPage')
      .then(() => this.closePage());
  }

  closePage() {
    this.tracker.track('Click', {method: 'closePage'});
    this.viewCtrl.dismiss();
  }

  private showAlert(type): Alert {
    let title, message;
    switch (type) {
      case 'token expired':
        title = this.translate.instant('DEVICE_CREATE.OUT_OF_DATE_TITLE');
        message = this.translate.instant('DEVICE_CREATE.OUT_OF_DATE_MSG');
        break;
      case 'scan failed':
        title = this.translate.instant('DEVICE_CREATE.SCAN_FAILED_TITLE');
        message = this.translate.instant('DEVICE_CREATE.SCAN_FAILED_MSG');
        break;
      case 'connect failed':
        title = this.translate.instant('DEVICE_CREATE.CONNECT_FAILED_TITLE');
        message = this.translate.instant('DEVICE_CREATE.CONNECT_FAILED_MSG');
        break;
    }
    const alert = this.alertCtrl.create({
      title,
      message,
      buttons: [this.translate.instant('DEVICE_CREATE.OK')]
    });
    alert.present();
    return alert;
  }

  openNativeSettings(args) {
    this.tracker.track('Click', {method: 'openNativeSettings'});
    return this.nativeSettings.open(args);
  }

  getWifiList() {
    const loading = this.loadingCtrl.create({
      content: this.translate.instant('DEVICE_CREATE.LIST_WIFI'),
    });
    loading.present();
    return WifiWizard2.scan()
      .then(xs => xs.filter(x => x.SSID))
      .then(uniqBy(get('SSID')))
      .catch(() => this.showAlert('scan failed')
        .onDidDismiss(() => this.navCtrl.pop())
      )
      .then(x => {
        loading.dismiss();
        return x;
      });
  }

  wifiApSelected(ssid) {
    this.selectedSsid = ssid;
    this.canContinue = true;
  }

  androidConnectProcess() {
    const ssid = this.selectedSsid;
    const loading = this.loadingCtrl.create({
      content: this.translate.instant('DEVICE_CREATE.CONNECT_SSID', { ssid }),
    });
    loading.present();
    return WifiWizard2.connect(ssid, true)
      .then(() => this.appTasks.queryDeviceInfoTask())
      .then(() => this.onNext())
      .catch(() => this.showAlert('connect failed')
        .onDidDismiss(() => {
          this.wifiAps = this.getWifiList();
        })
      )
      .then(x => {
        loading.dismiss();
        return x;
      });
  }
}
