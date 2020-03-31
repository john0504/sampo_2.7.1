import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { StateStore } from 'app-engine';

import { ThemeService } from '../../../providers/theme-service';
import { TrackService } from '../../../providers/track-service';
import { HomePageBase } from '../home-page-base';
import { ListGroupItemComponent } from "../../../components/list-group-item/list-group-item";
import { ListDeviceItemComponent } from '../../../components/list-device-item/list-device-item';

@IonicPage()
@Component({
  selector: 'page-small-list',
  templateUrl: 'small-list.html'
})
export class SmallListPage extends HomePageBase {

  constructor(
    navCtrl: NavController,
    platform: Platform,
    stateStore: StateStore,
    tracker: TrackService,
    translate: TranslateService,
    storage: Storage,
    themeService: ThemeService,
  ) {
    super(navCtrl, platform, stateStore, tracker, translate, storage, themeService);

    this.deviceComponent = ListDeviceItemComponent;
    this.groupComponent = ListGroupItemComponent;
  }
}
