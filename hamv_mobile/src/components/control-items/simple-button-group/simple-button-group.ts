import {
    Component,
    ElementRef,
    forwardRef,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import {
    ButtonGroupLogic,
    ButtonGroupLogicState,
    ComponentModel,
    ControlItemModel,
    InformationModelService,
    UIOptions,
    UIComponentBase,
    ValueItem
} from '../../../modules/information-model';
import { TrackService } from '../../../providers/track-service';

@Component({
    selector: 'simple-button-group',
    templateUrl: 'simple-button-group.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SimpleButtonGroup), multi: true }],
    encapsulation: ViewEncapsulation.None,
})
export class SimpleButtonGroup extends UIComponentBase {
    title: string;
    logic: ButtonGroupLogic;
    state: ButtonGroupLogicState;

    constructor(
        private tracker: TrackService,
        ims: InformationModelService,
        elementRef: ElementRef,
    ) {
        super(ims, 'simple-button-group', null);
        this.logic = new ButtonGroupLogic(ims, this.exoChange);
        this.state = this.logic.state;
    }

    protected processLayout(model: ComponentModel, values: Array<ValueItem> | UIOptions, key: string, index: number, unitModel: ControlItemModel, range?: any) {
        if (!values || !model || !unitModel || index !== 0) return;

        this.title = model.title;
        this.state = this.logic.processLayout(values, key, unitModel, range);
    }

    protected processUIState(currentValueState: any, key: string, index: number, model: ControlItemModel) {
        if (!key || index !== 0) return;
        this.state = this.logic.processUIState(currentValueState, key, model);
    }

    protected processDisableState(disableState, key: string, index: number, model: ControlItemModel) {
        if (index !== 0) return;
        this.state = this.logic.processDisableState(disableState, key, model);
    }

    onButtonClicked(val: any) {
        this.tracker.track('Click', {method: 'onButtonClicked'});
        if (this.model) {
            this.state = this.logic.sendValue(val);
        }
    }
}
