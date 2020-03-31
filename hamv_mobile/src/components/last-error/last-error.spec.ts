import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import {
  IonicModule,
  NavParams,
  ViewController,
} from 'ionic-angular';
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { PlatformMock } from 'ionic-mocks';

import { ViewControllerMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { TrackService } from '../../providers/track-service';
import { createTranslateLoader, TrackServiceMock } from '../../mocks/providers.mocks';
import { LastErrorComponent } from './last-error';
import { ExtraPageSpaceComponent } from '../extra-page-space/extra-page-space';
import { ThemeService } from '../../providers/theme-service';

describe('Component: GDPR Alert Component', () => {

  let component: LastErrorComponent;
  let fixture: ComponentFixture<LastErrorComponent>;

  let viewCtrl;

  beforeEach(() => {
    const themeService = jasmine.createSpyObj('ThemeService', ['logoUrl']);
    themeService.logoUrl = '';
    viewCtrl = ViewControllerMock.instance();
    TestBed.configureTestingModule({
      declarations: [
        LastErrorComponent,
        MockComponent(ExtraPageSpaceComponent),
      ],
      imports: [
        IonicModule.forRoot(LastErrorComponent),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          },
        }),
      ],
      providers: [
        { provide: ThemeService, useFactory: () => themeService },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: ViewController, useFactory: () => viewCtrl },
        { provide: NavParams, useValue: new NavParams({ lastError: 'a b c' }) },
        { provide: TrackService, useClass: TrackServiceMock },
      ],
    });

    fixture = TestBed.createComponent(LastErrorComponent);
    component = fixture.componentInstance;
  });

  it('should convert last error to translate keyword', () => {
    expect(component).toBeDefined();
    expect(component instanceof LastErrorComponent).toBeTruthy();
    expect(component.lastError).toEqual('LAST_ERROR.A_B_C');
  });
});
