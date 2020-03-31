import { Component } from '@angular/core';
import { AppEngine } from 'app-engine';

import { UtilsProvider } from '../../providers/utils-provider';
import { TrackService } from '../../providers/track-service';

@Component({
  selector: 'terms-of-service',
  templateUrl: 'terms-of-service.html'
})
export class TermsOfServiceComponent {

  constructor(
    private appEngine: AppEngine,
    private tracker: TrackService,
    private utilsProvider: UtilsProvider,
  ) {
  }

  openTerms() {
    this.tracker.track('Click', {method: 'openTerms'});
    const url = `https://${this.appEngine.getBaseUrl()}/#/legal`;
    this.utilsProvider.openLink(url);
  }
}



