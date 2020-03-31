import { AppEngine, AppTasks, StateStore } from 'app-engine';
import { File } from '@ionic-native/file';
import { FileMock } from '@ionic-native-mocks/file';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicModule, ViewController, NavController, NavParams } from 'ionic-angular';
import { MockComponent, MockDirective } from 'ng-mocks';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';
import { Storage } from '@ionic/storage';
import { TestBed, ComponentFixture} from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ViewControllerMock, NavControllerMock, StorageMock } from 'ionic-mocks';

import { AppEngineMock } from '../../../mocks/app-engine.mocks';
import { PopitGroupControlComponent } from '../../../components/popit-group-control/popit-group-control';
import { GroupControlPanelComponent } from '../../../components/group-control-panel/group-control-panel';
import { createTranslateLoader, DeviceConfigServiceMock, DeviceControlServiceMock, TrackServiceMock } from '../../../mocks/providers.mocks';
import { DeviceConfigService } from '../../../providers/device-config-service';
import { DeviceControlService } from '../../../providers/device-control-service';
import { GroupItemWrapperComponent } from '../../../components/group-item-wrapper/group-item-wrapper';
import { EmptyDevicesComponent } from '../../../components/empty-devices/empty-devices';
import { EmptyGroupDevicesComponent } from '../../../components/empty-group-devices/empty-group-devices';
import { InformationModelModule } from '../../../modules/information-model';
import { SingleAccordionPage } from './single-accordion';
import { ScrollableTabs } from '../../../components/scrollable-tabs/scrollable-tabs';
import { ThemeService } from '../../../providers/theme-service';
import { TrackService } from '../../../providers/track-service';
import { GoAddingDeviceDirective } from '../../../directives/go-adding-device/go-adding-device';

describe('Page - single accordion', () => {
  let component: SingleAccordionPage;
  let fixture: ComponentFixture<SingleAccordionPage>;

  beforeEach(() => {
    const themeService = jasmine.createSpyObj('ThemeService', ['logoUrl']);
    themeService.logoUrl = '';

    TestBed.configureTestingModule({
      declarations: [
        SingleAccordionPage,
        MockComponent(GroupControlPanelComponent),
        MockComponent(PopitGroupControlComponent),
        MockComponent(GroupItemWrapperComponent),
        MockComponent(EmptyDevicesComponent),
        MockComponent(EmptyGroupDevicesComponent),
        MockComponent(ScrollableTabs),
        MockDirective(GoAddingDeviceDirective),
      ],
      imports: [
        IonicModule.forRoot(SingleAccordionPage),
        InformationModelModule.forRoot(),
        NgReduxTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        { provide: AppEngine, useClass: AppEngineMock },
        { provide: DeviceConfigService, useClass: DeviceConfigServiceMock },
        { provide: DeviceControlService, useClass: DeviceControlServiceMock },
        { provide: File, useClass: FileMock },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useValue: new NavParams({ deviceSn: "a device id" }) },
        { provide: Storage, useFactory: () => StorageMock.instance() },
        { provide: ThemeService, useFactory: () => themeService },
        { provide: TrackService, useFactory: () => TrackServiceMock },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
        AppTasks,
        StateStore,
      ]
    });

    fixture = TestBed.createComponent(SingleAccordionPage);
    component = fixture.componentInstance;
  });

  afterEach(() => MockNgRedux.reset());

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component instanceof SingleAccordionPage).toBeTruthy();
  });
});
