import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable, Subscription } from 'rxjs';
import { defer } from 'rxjs/observable/defer';
import { delay, repeatWhen } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { AppActions, AppTasks, WifiSecurityType } from 'app-engine';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';
import { CheckNetworkService } from '../../providers/check-network';

import { LastErrorComponent } from '../../components/last-error/last-error';

import { AppUtils } from '../../utils/app-utils';

const SSID_LIST = '_ssid_list';

@IonicPage()
@Component({
  selector: 'page-ssid-confirm',
  templateUrl: 'ssid-confirm.html'
})
export class SsidConfirmPage {

  private subs: Array<Subscription>;
  private deviceInfo$: Observable<any>;
  deviceInfo;
  selectAp;
  wifiAps;
  wifiAp: { ssid: string, password?: string, sec?: string };
  sec;
  isInit: boolean = false;
  saveSsid: boolean = false;
  useText: boolean = false;
  isSelectFocus = false;
  ssidList: Array<{ ssid: string, password?: string, sec?: string }>;

  iconName: string = 'eye';
  inputType: string = 'password';
  showPassword: boolean = false;
  modal;

  constructor(
    private ngRedux: NgRedux<any>,
    private appTasks: AppTasks,
    private storage: Storage,
    private tracker: TrackService,
    public checkNetworkService: CheckNetworkService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public themeService: ThemeService,
    public viewCtrl: ViewController,
  ) {
    this.subs = [];
    this.deviceInfo$ = this.ngRedux.select(['ssidConfirm', 'deviceInfo']);
    this.wifiAp = { ssid: '', password: '', sec: WifiSecurityType.WPA2 };
    this.storage.get(SSID_LIST).then(list => this.ssidList = list || []);
  }

  clearSSID() {
    if (this.useText) {
      this.selectAp = null;
    }
    this.wifiAp = { ssid: '', password: '', sec: WifiSecurityType.WPA2 };
  }

  needPassword() {
    return this.wifiAp && this.wifiAp.sec !== WifiSecurityType.OPEN;
  }

  fulfillPassword() {
    const wifiSetting = this.ssidList.find(wifiSetting => this.wifiAp.ssid === wifiSetting.ssid);
    if (wifiSetting) {
      this.wifiAp.password = wifiSetting.password;
      this.wifiAp.sec = wifiSetting.sec;
    } else {
      this.wifiAp.password = '';
    }
    this.saveSsid = !!wifiSetting;
  }

  wifiApSelected() {
    if (this.selectAp && this.wifiAp.ssid != this.selectAp.ssid) {
      this.wifiAp.ssid = this.selectAp.ssid;
      this.fulfillPassword();
      this.wifiAp.sec = this.selectAp.sec;
    }
  }

  isValid(): boolean {
    if (!this.wifiAp) return false;
    if (!this.wifiAp.ssid)
      return false;
    if (!(this.wifiAp.sec === WifiSecurityType.OPEN || this.wifiAp.sec === WifiSecurityType.WEP ||
      this.wifiAp.sec === WifiSecurityType.WPA2 || this.wifiAp.sec === WifiSecurityType.WPA))
      return false;
    if (!this.wifiAp.password && this.wifiAp.sec !== WifiSecurityType.OPEN)
      return false;
    if (this.wifiAp.password && this.wifiAp.password.length < 8)
      return false;

    return true;
  }

  onNext() {
    const index = this.ssidList.findIndex(wifiSetting => this.wifiAp.ssid === wifiSetting.ssid);
    if (index === -1) {
      if (this.saveSsid) this.ssidList.push(this.wifiAp);
    } else {
      if (this.saveSsid) {
        this.ssidList[index] = this.wifiAp;
      } else {
        this.ssidList.splice(index, 1);
      }
    }
    this.storage.set(SSID_LIST, this.ssidList);
    this.navCtrl.push('ProvisionLoadingPage', { wifiAp: this.wifiAp, method: this.deviceInfo.provision })
      .then(() => this.closePage());
    this.tracker.track('Click', {method: 'closePage'});
  }

  onShowHidePassword() {
    this.tracker.track('Click', {method: 'onShowHidePassword'});
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType = 'text';
      this.iconName = 'eye-off';
    } else {
      this.inputType = 'password';
      this.iconName = 'eye';
    }
  }

  ionViewDidLoad() {
    this.checkNetworkService.pause();
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
    this.subs.push(
      this.queryDeviceInfo()
        .pipe(repeatWhen(attampes => attampes.pipe(delay(10000))))
        .subscribe()
    );
    this.subs.push(
      this.deviceInfo$
        .subscribe(deviceInfo => {
          this.deviceInfo = deviceInfo;
          if (!this.modal && this.deviceInfo.last_error) {
            this.modal = this.modalCtrl.create(LastErrorComponent, { lastError: this.deviceInfo.last_error });
            this.modal.present();
          }
          if (!this.isSelectFocus && !this.useText) {
            let _wifiAps = deviceInfo && deviceInfo.wifi ? deviceInfo.wifi : [];
            _wifiAps = _wifiAps.sort((a, b) => AppUtils.compareWifiSignalStrength(a, b));
            _wifiAps = JSON.parse(JSON.stringify(_wifiAps));
            if (!this.isInit) {
              this.isInit = true;
              this.autoSelection(_wifiAps);
            }
            const _selectAp = _wifiAps.find(wifiAp => wifiAp.ssid === this.wifiAp.ssid);
            if (_selectAp) {
              this.selectAp = _selectAp;
            } else if (this.selectAp) {
              _wifiAps.push(this.selectAp);
            }
            this.wifiAps = _wifiAps;
          }
        })
    );
  }

  ionViewWillLeave() {
    this.subs && this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs.length = 0;
  }

  ionViewWillUnload() {
    this.checkNetworkService.resume();
  }

  compareFn(e1, e2): boolean {
    return e1.ssid === e2.ssid;
  }

  private queryDeviceInfo() {
    return defer(() => this.appTasks.queryDeviceInfoTask());
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  private autoSelection(wifiAps: Array<any>) {
    const result = wifiAps.find(wifiAp => {
      const index = this.ssidList.findIndex(wifiSetting => wifiSetting.ssid === wifiAp.ssid);
      return index !== -1;
    });
    if (result) {
      this.selectAp = result;
      this.wifiApSelected();
    }
  }
}

const INITIAL_STATE = {
  deviceInfo: null,
};

export function ssidConfirmReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AppActions.QUERY_DEVICE_INFO_DONE:
      if (!action.error) {
        return Object.assign({}, state, { deviceInfo: action.payload, });
      }
      return state;
    default:
      return state;
  }
}
