import { Injectable } from '@angular/core';

import cloneDeep from 'lodash/cloneDeep';
import mixpanel from 'mixpanel-browser';

import { appConfig } from '../app/app.config';

@Injectable()
export class TrackService {

  private mock = new Proxy({}, {
    get: (target, name) => {
      if (['people'].find(s => s === name)) {
        return new Proxy({}, {
          get: () => () => {},
        });
      } else {
        return () => {};
      }
    },
  });
  private queue = Promise.resolve();

  constructor(
  ) {}

  get mixpanel () {
    return appConfig.mixpanel.token === 'YOUR_TOKEN' ? this.mock : mixpanel;
  }

  public page (name) {
    
    this.mixpanel.track('Page', {page: name});
  }

  public track (name, params) {
    
    this.mixpanel.track(name, cloneDeep(params));
  }
}
