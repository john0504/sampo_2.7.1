import { EventEmitter } from '@angular/core';

import {
    ControlItemModel,
    InformationModelService,
    OUTLIER,
    UIOptions,
    ValueItem,
} from '../../information-model';
import { LogicBase } from './logic-base';

export class ReadOnlyLogic extends LogicBase<ReadOnlyLogicState> {
    public state: ReadOnlyLogicState;
    private _defaultValueItem: ValueItem = {
        value: OUTLIER,
        text: '--'
    };
    private values: Array<ValueItem> | UIOptions;

    constructor(
        _ims: InformationModelService,
        _exoChange: EventEmitter<{ key: string, value: any }>,
    ) {
        super(_ims, _exoChange);

        this.ims = _ims;
        this.state = {
            currentIndex: -1,
            default: undefined,
            disableState: false,
            key: '',
            status: {
                min: 0,
                max: 1,
                step: 1,
            },
            currentValueItem: this._defaultValueItem,
        };
    }

    private getCurrentIndex(currentValue: number) {
        if (this.values instanceof Array) {
            const currentValues = this.values as Array<ValueItem>;
            return currentValues.findIndex(({ value }) => value === currentValue);
        }
        return currentValue;
    }

    private getValueItem(index: any): ValueItem {
        if (this.values instanceof Array) {
          return index >= 0 && index < this.values.length && this.values[index] ? this.values[index] : this._defaultValueItem;
        } else if (this.values.func) {
          return this.ims.getValueItemByFunction(this.values.func, index, this._defaultValueItem);
        } else if (this.values.rules && this.ims.isValidRules(this.values.rules)) {
          return this.ims.getValueItemByRules(this.values.rules, this.state.key, index, this._defaultValueItem);
        }

        return this._defaultValueItem;
    }

    public processLayout(values: Array<ValueItem> | UIOptions, key: string, unitModel: ControlItemModel): ReadOnlyLogicState {
        this.state.key = key;
        this.state.default = unitModel.default;

        if (this.values === values) return this.state;

        if (values instanceof Array) {
            this.state.status = {
                min: 0,
                max: values.length - 1,
                step: 1,
            };
        } else {
            this.state.status = {
                min: values.min,
                max: values.max,
                step: values.step,
            };
        }

        this.values = values;
        return this.state;
    }

    public processUIState(currentValueState: any, key: string, model: ControlItemModel): ReadOnlyLogicState {
        const currentValue = currentValueState ? currentValueState[key] : undefined;
        this.state.currentIndex = this.getCurrentIndex(currentValue);
        this.state.currentValueItem = this.getValueItem(this.state.currentIndex);

        return this.state;
    }

    public processDisableState(disableState, key: string, model: ControlItemModel): ReadOnlyLogicState {
        this.state.disableState = disableState;
        return this.state;
    }

    public sendValue(value: any): ReadOnlyLogicState {
        this.state.currentValueItem = this.getValueItem(value);
        return this.state;
    }
}

export interface ReadOnlyLogicState {
    key: string;
    status: {
        min: number,
        max: number,
        step: number,
    };
    default: number;
    disableState: boolean;
    currentIndex: number;
    currentValueItem: ValueItem;
}
