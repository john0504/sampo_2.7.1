import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertController,
  DateTime,
  IonicPage,
  NavParams,
  ViewController,
} from 'ionic-angular';
import {
  Schedule,
  StateStore,
} from 'app-engine';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';

import { AppUtils } from '../../utils/app-utils';
import { PopupService } from '../../providers/popup-service';
import { DeviceCoreInjector } from '../../item-models/device/device-core-injector';
import { DeviceCore } from '../../item-models/device/device-core';
import { ScheduleCoreInjector } from '../../item-models/schedule/schedule-core-injector';
import { TzScheduleCore } from '../../item-models/schedule/schedule-core';
import { CalendarService } from '../../providers/calendar-service';
import { TrackService } from '../../providers/track-service';

const defaultActions = {
  H00: 1,
};

@IonicPage()
@Component({
  selector: 'page-schedule-edit',
  templateUrl: 'schedule-edit.html'
})
export class ScheduleEditPage {

  action: string;
  schedule: Schedule;
  isOneShot: boolean = false;
  buttons: Array<Object> = [
    {
      value: 1,
      text: 'SCHEDULE_REPEAT_TIME.MONDAY',
    },
    {
      value: 2,
      text: 'SCHEDULE_REPEAT_TIME.TUESDAY',
    },
    {
      value: 3,
      text: 'SCHEDULE_REPEAT_TIME.WEDNESDAY',
    },
    {
      value: 4,
      text: 'SCHEDULE_REPEAT_TIME.THURSDAY',
    },
    {
      value: 5,
      text: 'SCHEDULE_REPEAT_TIME.FRIDAY',
    },
    {
      value: 6,
      text: 'SCHEDULE_REPEAT_TIME.SATURDAY',
    },
    {
      value: 7,
      text: 'SCHEDULE_REPEAT_TIME.SUNDAY',
    },
  ];

  @ViewChild('startdt') startDt: DateTime;
  @ViewChild('enddt') endDt: DateTime;

  deviceCore: DeviceCore;
  deviceSn: string;
  scheduleCore: TzScheduleCore;
  index: number = -2;

  devices$: Observable<any>;

  constructor(
    private calenderService: CalendarService,
    private dcInjector: DeviceCoreInjector,
    private popupService: PopupService,
    private scheduleInjector: ScheduleCoreInjector,
    private stateStore: StateStore,
    private tracker: TrackService,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public params: NavParams,
  ) {
    this.devices$ = this.stateStore.devices$;
    this.deviceSn = params.get('deviceSn');
    this.index = params.get('index');
    this.deviceCore = this.dcInjector.create();
    this.scheduleCore = this.scheduleInjector.fromTzSchedule();
    this.schedule = this.scheduleCore.schedule;
  }

  isCreationMode(): boolean {
    return this.index === -1;
  }

  ionViewWillEnter() {
    this.devices$.pipe(first()).subscribe(devices => this.processValues(devices));
  }

  ionViewDidEnter() {
    this.tracker.page(this.constructor.name);
  }

  private processValues(devices) {
    if (this.validateDevices(devices) && this.validateIndex(this.index)) {
      const device = devices[this.deviceSn];
      this.deviceCore = this.dcInjector.bind(this.deviceCore, device);
      this.deviceCore.selfUpdate();
      if (this.isCreationMode()) {
        this.initCreationPage();
      } else {
        this.initEditPage();
      }
      this.schedule = this.scheduleCore.schedule;
      this.isOneShot = this.scheduleCore.isOneShot;
    } else {
      this.viewCtrl.dismiss();
    }
  }

  private validateDevices(devices) {
    return this.deviceSn && devices && devices[this.deviceSn];
  }

  private validateIndex(index) {
    return this.index >= -1;
  }

  private initCreationPage() {
    this.action = this.translate.instant('SCHEDULE_EDIT.CREATE');
    const currentDate: Date = new Date();
    const startHour = currentDate.getHours() + 1;
    const esh = Object.assign({}, this.deviceCore.status);
    const eshActions = this.deviceCore.filterActions(esh, defaultActions);
    const schedule: Schedule = {
      name: '',
      start: AppUtils.getFormatTime(startHour),
      end: AppUtils.getFormatTime(startHour + 1),
      days: [currentDate.getDay()],
      active: 1,
      active_until: null,
      esh: eshActions,
    };
    this.scheduleCore = this.scheduleInjector.fromTzSchedule(schedule);
  }

  private initEditPage() {
    this.action = this.translate.instant('SCHEDULE_EDIT.EDIT');
    const utcSchedule = this.deviceCore.calendar[this.index];
    this.scheduleCore = this.scheduleInjector.fromUtcToTzSchedule(utcSchedule);
    const eshActions = Object.assign({}, utcSchedule.esh);
    this.scheduleCore.schedule.esh = eshActions;
  }

  setRepeatData() {
    this.isOneShot = !this.isOneShot;
    this.scheduleCore.setOneShot(this.isOneShot);
  }

  deleteScheduleConfirm() {
    this.tracker.track('Click', {method: 'deleteScheduleConfirm'});
    const alert = this.alertCtrl.create({
      title: this.translate.instant('SCHEDULE_EDIT.DELETE_SCHEDULE'),
      message: this.translate.instant('SCHEDULE_EDIT.DELETE_SCHEDULE_MSG', { name: this.schedule.name }),
      buttons: [
        {
          text: this.translate.instant('SCHEDULE_EDIT.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('SCHEDULE_EDIT.DELETE'),
          handler: () => {
            this.deleteSchedule();
          }
        }
      ],
    });
    alert.present();
  }

  private deleteSchedule() {
    const calendar = [];
    if (this.index > -1) {
      this.deviceCore.calendar.map((schedule, i) => {
        if (this.index !== i) calendar.push(schedule);
      });
    }

    let p = this.calenderService
      .saveCalendar({
        deviceSn: this.deviceSn,
        calendar,
      })
      .toPromise()
      .then(() => this.viewCtrl.dismiss());

    p = this.popupService.loadingPopup(p, {
      content: this.translate.instant('SCHEDULE_EDIT.DELETING')
    });

    this.popupService.toastPopup(p, null, {
      message: this.translate.instant('SCHEDULE_EDIT.DELETE_FAILED'),
      duration: 3000
    });
  }

  setCommand(event) {
    this.schedule.esh[event.key] = event.value;
    this.schedule.esh = Object.assign({}, this.schedule.esh);
  }

  save() {
    this.tracker.track('Click', {method: 'save'});
    const shouldPopupShows =
      this.deviceCore.isAvailable &&
      this.scheduleCore.isOverlapping;
    if (shouldPopupShows) {
      this.showExecutePopup();
    } else {
      this.saveCalendar();
    }
  }

  private showExecutePopup() {
    this.alertCtrl
      .create({
        title: this.translate.instant('SCHEDULE_EDIT.EXECUTE_POPUP_TITLE'),
        message: this.translate.instant('SCHEDULE_EDIT.EXECUTE_POPUP_MSG'),
        buttons: [
          {
            handler: () => this.saveCalendar(),
            text: this.translate.instant('SCHEDULE_EDIT.LATER'),
          },
          {
            handler: () => this.saveCalendar(true),
            text: this.translate.instant('SCHEDULE_EDIT.START_NOW'),
          },
        ]
      })
      .present();
  }

  private saveCalendar(executeNow: boolean = false) {
    this.adjustScheduleName();
    this.adjustSchedule();

    if (executeNow) {
      this.deviceCore.sendCommands(this.scheduleCore.esh);
    }

    let p = this.calenderService
      .saveCalendar({
        deviceSn: this.deviceSn,
        calendar: this.deviceCore.calendar,
        schedule: this.scheduleCore.toUtcSchedule(executeNow),
        index: this.index,
      })
      .toPromise()
      .then(() => this.viewCtrl.dismiss());

    p = this.popupService.loadingPopup(p, {
      content: this.translate.instant('SCHEDULE_EDIT.SAVING')
    });

    this.popupService.toastPopup(p, null, {
      message: this.translate.instant('SCHEDULE_EDIT.SAVE_FAILED'),
      duration: 3000
    });
  }

  private adjustSchedule() {
    this.schedule = this.scheduleCore.schedule;
    this.schedule.active = 1;
    this.schedule.esh = this.deviceCore.filterActions(this.scheduleCore.esh, defaultActions);
  }

  private adjustScheduleName() {
    const scheduleName = this.scheduleCore.name;
    if (scheduleName && scheduleName.trim() !== '') {
      this.schedule.name = scheduleName.trim();
    } else {
      this.schedule.name = this.translate.instant('SCHEDULE_EDIT.MY_SCHEDULE');
    }
  }

  openStartDateTime() {
    this.tracker.track('Click', {method: 'openStartDateTime'});
    this.startDt.open();
  }

  openEndDateTime() {
    this.tracker.track('Click', {method: 'openEndDateTime'});
    this.endDt.open();
  }

  toggleScheduleDay(args) {
    this.tracker.track('Click', {method: 'toggleScheduleDay'});
    this.scheduleCore.toggleScheduleDay(args);
  }
}
