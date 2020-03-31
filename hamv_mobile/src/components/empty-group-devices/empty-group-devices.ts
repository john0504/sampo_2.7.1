import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ThemeService } from '../../providers/theme-service';
import { TrackService } from '../../providers/track-service';

@Component({
  selector: 'empty-group-devices',
  templateUrl: 'empty-group-devices.html'
})
export class EmptyGroupDevicesComponent {
  constructor(
    private tracker: TrackService,
    public navCtrl: NavController,
    public themeService: ThemeService,
  ) {
  }

  goToGroupsPage() {
    this.tracker.track('Click', {method: 'goToGroupsPage'});
    this.navCtrl.setRoot('MyGroupsPage');
  }
}
