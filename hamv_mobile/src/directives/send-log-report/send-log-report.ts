import { Directive, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { TextEncoder } from 'text-encoding';
import * as base64js from 'base64-js';

import { AppTasks, Logger, StateStore } from 'app-engine';

import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { EmailComposer } from '@ionic-native/email-composer';

import { PopupService } from '../../providers/popup-service';
import { appConfig } from '../../app/app.config';

@Directive({
  selector: '[send-log-report]',
  host: {
    '(click)': 'report()',
  }
})
export class SendLogReportDirective {
  @Input('send-log-report') logType: string;

  private version: string;
  private reporter: string;

  constructor(
    private appTasks: AppTasks,
    private appVersion: AppVersion,
    private device: Device,
    private emailComposer: EmailComposer,
    private platform: Platform,
    private popupService: PopupService,
    private stateStore: StateStore,
    private translate: TranslateService,
  ) {
    this.platform.ready()
      .then(() => {
        this.emailComposer.addAlias('gmail', 'com.google.android.gm');
        this.setAppVersion();
      });
    this.stateStore.account$
      .subscribe(account => {
        if (account) {
          this.reporter = account.account;
        }
      });
  }

  private setAppVersion() {
    this.appVersion.getVersionNumber()
      .then(version => (this.version = version));
  }

  report() {
    const promise = this.logType === 'deviceLogs'
      ? this.appTasks.queryDeviceLogsTask()
      : Logger.export();
    this.popupService.loadingPopup(this.sendByEmail(promise), {
      content: this.translate.instant('SEND_LOG_REPORT.LOADING'),
    });
  }

  private sendByEmail(promise): Promise<any> {
    return promise
      .then(text => {
        const options = {
          app: this.platform.is('android') ? 'gmail' : undefined,
          attachments: [
            `base64:log.txt//${this.base64EncodingUTF8(text)}`,
          ],
          body: `
Please describe your issue below, including the steps you took to encounter the issue:


__________________________
App Version: ${this.version}
Model Info: ${this.device.model}
Device Version: ${this.device.version}
Username: ${this.reporter}
            `,
          subject: `Reported issue from ${this.reporter}`,
          to: appConfig.app.support.email,
        };

        return this.emailComposer.open(options);
      })
      .catch(e => {
        if (e !== 'cordova_not_available') throw e;
      });
  }

  private base64EncodingUTF8(str) {
    const encoded = new TextEncoder().encode(str);
    const b64Encoded = base64js.fromByteArray(encoded);
    return b64Encoded;
  }

}
