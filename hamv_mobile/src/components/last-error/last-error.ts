import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { TrackService } from '../../providers/track-service';
import { ThemeService } from '../../providers/theme-service';

@Component({
  selector: 'last-error',
  templateUrl: 'last-error.html'
})
export class LastErrorComponent {

  public lastError = '';

  constructor(
    private params: NavParams,
    private tracker: TrackService,
    private viewCtrl: ViewController,
    public themeService: ThemeService,
  ) {
    this.lastError = 'LAST_ERROR.' + this.params.get('lastError').split(' ').join('_').toUpperCase();
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  closePage() {
    this.viewCtrl.dismiss();
  }
}
