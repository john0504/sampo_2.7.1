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
import { ListGroupItemComponent } from '../../../components/list-group-item/list-group-item';
import { PopitContainerComponent } from '../../../components/popit-container/popit-container';

@IonicPage()
@Component({
  selector: 'page-popit-list',
  templateUrl: 'popit-list.html'
})
export class PopitListPage extends HomePageBase {

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

    this.groupComponent = ListGroupItemComponent;
    this.deviceComponent = PopitContainerComponent;
  }
}
