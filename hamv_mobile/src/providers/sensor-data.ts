import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {
  Observable,
} from 'rxjs';
import {
  find,
  get,
  values,
} from 'lodash';

import {
  AppEngine,
  StateStore,
} from 'app-engine';

import {
  ComponentModel,
  InformationModelService,
} from '../modules/information-model';
import { PopupService } from './popup-service';

@Injectable()
export class SensorDataService {

  private devices$: Observable<any>;
  private deviceMapping;

  constructor(
    private appEngine: AppEngine,
    private ims: InformationModelService,
    private platform: Platform,
    private popupService: PopupService,
    private stateStore: StateStore,
    private translate: TranslateService,
  ) {
    this.devices$ = this.stateStore.devices$;
    this.platform.ready()
      .then(() => this.init());
  }

  private init() {
    this.appEngine.setWebsocketCallbacks({
      onEvent: e => this.onEvent(e),
    });

    this.devices$.subscribe(devices => {
      this.deviceMapping = devices;
    });
  }

  private onEvent(e) {
    try {
      const obj = JSON.parse(e.data);
      if (obj.event === 'unsubscribed') {
        this.unsubscribed(obj.data);
      }
    } catch(e) {
      console.error(e);
    }
  }

  private unsubscribed(data) {
    this.popupService.makeToast({
      closeButtonText: 'X',
      message: this.formatMessage(data),
      position: 'top',
      showCloseButton: true,
    });
  }

  private formatMessage({device = '', fields = []}) {
    const deviceObject = this.deviceMapping[device];
    const deviceName = get(deviceObject, 'properties.displayName', device);
    const uiModel = this.ims.getUIModel(deviceObject);
    const fieldsName = fields
      .map(field => this.fieldToComponentTitle(uiModel, field))
      .map(title => this.translate.instant(title))
      .join(', ');
    return `Please reopen your app to get the latest data of ${fieldsName} from ${deviceName}.`;
  }

  private fieldToComponentTitle(uiModel, field) {
    const component = values(uiModel.components)
      .find((x: ComponentModel) => !!find(x.models, { key: field }));
    return get(component, 'title', field);
  }
}
