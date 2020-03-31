import {
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { GroupBagComponent } from './group-bag';
import { TrackService } from '../../providers/track-service';
import { TrackServiceMock } from '../../mocks/providers.mocks';

describe('Component: device bag', () => {

  let component: GroupBagComponent;
  let fixture: ComponentFixture<GroupBagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupBagComponent,
      ],
      imports: [
        IonicModule.forRoot(GroupBagComponent),
      ],
      providers: [
        { provide: TrackService, useClass: TrackServiceMock },
      ]
    });

    fixture = TestBed.createComponent(GroupBagComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component instanceof GroupBagComponent).toBeTruthy();
  });

  it('set group', () => {
    component.group = {
      name: '__my_devices_group__',
      devices: ['deviceId_5', 'deviceId_2', 'deviceId_3', 'deviceId_1', 'deviceId_4'],
      properties: {
        displayName: 'MY_DEVICES.ALL_DEVICES'
      },
    };

    expect(component.group).toEqual({
      name: '__my_devices_group__',
      devices: ['deviceId_5', 'deviceId_2', 'deviceId_3', 'deviceId_1', 'deviceId_4'],
      properties: {
        displayName: 'MY_DEVICES.ALL_DEVICES'
      },
    });
  });

  it('trigger action', () => {
    component.triggerAction();
  });

});
