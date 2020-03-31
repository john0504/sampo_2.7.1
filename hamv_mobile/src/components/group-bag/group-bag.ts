import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { TrackService } from '../../providers/track-service';

@Component({
    selector: 'group-bag',
    templateUrl: 'group-bag.html'
})
export class GroupBagComponent {

    _group;

    @Output() groupAction: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private tracker: TrackService,
    ) {
    }

    @Input()
    set group(val: any) {
        this._group = val;
    }

    get group() {
        return this._group;
    }

    triggerAction() {
        this.tracker.track('Click', {method: 'triggerAction'});
        this.groupAction.emit();
    }
}
