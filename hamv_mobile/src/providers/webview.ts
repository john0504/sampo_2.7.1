import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class WebView {

  private win: any = window;

  constructor(
    private platform: Platform,
  ) { }

  convertFileSrc(url) {
    return this.platform.is('cordova')
      ? this.safeParse(url)
      : url;
  }

  private safeParse(url) {
    try {
      return this.win.Ionic.WebView.convertFileSrc(url);
    } catch(e) {
      return url;
    }
  }
}
