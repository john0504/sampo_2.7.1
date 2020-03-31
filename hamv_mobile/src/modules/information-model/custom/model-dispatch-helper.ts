import { Injectable } from '@angular/core';

import { Device } from 'app-engine';

@Injectable()
export class ModelDispatchHelper {

    constructor(
    ) {
    }

  public getUIModelViaCustomLogic(device: Device): string {
    // If there is any custom logic needs to be extended, please re-write this function.
    const decimal = parseInt(device.profile.esh.deviceId, 16);
    if (decimal >= 1 && decimal <=18) {
      const withZeroPrefix = ('00' + decimal).slice(-2);
      return `SA${withZeroPrefix}`;
    }
  }

}
