import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing'
import { EventEmitter } from '@angular/core'
import { Platform } from 'ionic-angular'
import {
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core'
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'

import {
  InformationModelModule,
  InformationModelService,
  ModelManagerService,
} from '../modules/information-model'
import { SensorDataService } from './sensor-data'
import { PopupService } from './popup-service'
import {
  AppEngine,
  StateStore,
} from 'app-engine'
import {
  NgReduxTestingModule,
  MockNgRedux
} from '@angular-redux/store/testing'
import { AppEngineMock } from '../mocks/app-engine.mocks'
import {
  PopupServiceMock,
  createTranslateLoader,
} from '../mocks/providers.mocks'
import { PlatformMock } from 'ionic-mocks'

describe('Check network service', () => {
  let instance: SensorDataService
  let ims: InformationModelService
  let platform

  beforeAll(() => {
    platform = PlatformMock.instance()
    platform.resume = new EventEmitter<Event>()
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
        InformationModelModule.forRoot(),
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
        { provide: AppEngine, useClass: AppEngineMock },
        { provide: File, useClass: FileMock },
        { provide: Platform, useFactory: () => platform },
        { provide: PopupService, useClass: PopupServiceMock },
        StateStore,
        SensorDataService,
      ],
    })
    const injector = getTestBed()
    instance = injector.get(SensorDataService)
    ims = injector.get(InformationModelService)
  })

  it('init', () => {
    spyOn(instance.appEngine, 'setWebsocketCallbacks')

    instance.init()

    expect(instance.appEngine.setWebsocketCallbacks).toHaveBeenCalledWith({
      onEvent: jasmine.any(Function),
    })
  })

  it('onEvent', () => {
    spyOn(instance, 'unsubscribed')

    const data = 'data'
    const payload = {
      data: JSON.stringify({
        event: 'unsubscribed',
        data,
      }),
    }
    instance.onEvent(payload)

    expect(instance.unsubscribed).toHaveBeenCalledWith(data)
  })

  it('unsubscribed', () => {
    const message = 'message'
    spyOn(instance.popupService, 'makeToast')
    spyOn(instance, 'formatMessage').and.returnValue(message)

    const payload = {
      closeButtonText: 'X',
      message,
      position: 'top',
      showCloseButton: true,
    }
    instance.unsubscribed(payload)

    expect(instance.popupService.makeToast).toHaveBeenCalledWith(payload)
  })

  it('formatMessage', () => {
    instance.deviceMapping = {
      sn: {
        properties: {
          displayName: 'displayName',
        },
      },
    }
    const uiModel = {
      components: {
        componentA: {
          title: 'titleA',
          models: [
            {
              key: 'H00',
            },
            {
              key: 'H01',
            }
          ],
        },
        componentB: {
          title: 'titleB',
          models: [
            {
              key: 'H02',
            },
            {
              key: 'H03',
            }
          ],
        },
      },
    }
    spyOn(instance.ims, 'getUIModel').and.returnValue(uiModel)

    const payload = {
      device: 'sn',
      fields: ['H01', 'H02'],
    }
    const actual = instance.formatMessage(payload)

    expect('Please reopen your app to get the latest data of titleA, titleB from displayName.').toEqual(actual)
  })

  it('fieldToComponentTitle', () => {
    const uiModel = {
      components: {
        componentA: {
          title: 'titleA',
          models: [
            {
              key: 'H00',
            },
            {
              key: 'H01',
            }
          ],
        },
        componentB: {
          title: 'titleB',
          models: [
            {
              key: 'H02',
            },
            {
              key: 'H03',
            }
          ],
        },
      },
    }

    const actual = instance.fieldToComponentTitle(uiModel, 'H03')

    expect('titleB').toEqual(actual)
  })
})
