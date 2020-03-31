import { Component, Input } from '@angular/core';

import { Group } from 'app-engine';
import { NavController } from "ionic-angular";
import { TrackService } from '../../providers/track-service';

@Component({
  selector: 'button-group-control',
  templateUrl: 'button-group-control.html'
})
export class ButtonGroupControlComponent {
  _group: Group;

  constructor(
    private navCtrl: NavController,
    private tracker: TrackService,
  ) {
  }

  @Input()
  set group(val: Group) {
    this._group = val;
  }

  get group(): Group {
    return this._group;
  }

  goGroupDetail({ name }) {
    this.tracker.track('Click', {method: 'goGroupDetail'});
    this.navCtrl.push('GroupDetailPage', { groupId: name });
  }
}
