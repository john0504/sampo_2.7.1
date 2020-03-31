import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicModule } from 'ng-dynamic-component';
import { NgxEchartsModule } from 'ngx-echarts';
import { InformationModelModule } from '../modules/information-model';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { ImageCacheModule } from '../modules/image-cache';
import { GridDeviceItemComponent } from './grid-device-item/grid-device-item';
import { ListDeviceItemComponent } from './list-device-item/list-device-item';
import { LargeListItemComponent } from './large-list-item/large-list-item';
import { SingleAccordionContainerComponent } from './single-accordion-container/single-accordion-container';
import { PopitContainerComponent } from './popit-container/popit-container';
import {
  ButtonGroupWithToggle,
  RangeWithToggle,
  LargeToggleWithRange,
  LargeToggle,
  SimpleButtonGroup,
  SimpleRange,
  CustomRange,
  SimpleText,
  SimpleToggle,
  LineChart,
  BarChart,
} from './control-items';
import { EmptyDevicesComponent } from "./empty-devices/empty-devices";
import { EmptyGroupDevicesComponent } from "./empty-group-devices/empty-group-devices";
import { GroupItemWrapperComponent } from './group-item-wrapper/group-item-wrapper';
import { GridGroupItemComponent } from './grid-group-item/grid-group-item';
import { ListGroupItemComponent } from './list-group-item/list-group-item';
import { DeviceItemWrapperComponent } from './device-item-wrapper/device-item-wrapper';
import { GroupBagComponent } from './group-bag/group-bag';
import { DeviceBagComponent } from './device-bag/device-bag';
import { ExtraPageSpaceComponent } from './extra-page-space/extra-page-space';
import { ScrollableTabs } from './scrollable-tabs/scrollable-tabs';
import { GroupControlPanelComponent } from './group-control-panel/group-control-panel';
import { PopitGroupControlComponent } from "./popit-group-control/popit-group-control";
import { ButtonGroupControlComponent } from "./button-group-control/button-group-control";
import { GrayButtonGroupControlComponent } from "./gray-button-group-control/gray-button-group-control";
import { PageNav } from './page-nav/page-nav';
import { PageRouteManager } from './page-nav/page-route-manager';
import { GdprAlertComponent } from './gdpr-alert/gdpr-alert';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service';
import { LanguageSelectorComponent } from './language-selector/language-selector';
import { EchartsCore } from './chart-components/echarts-core/echarts-core';
import { EchartsService } from './chart-components/echarts-core/echarts-service';
import { TrackService } from '../providers/track-service';
import { LastErrorComponent } from './last-error/last-error';

@NgModule({
  declarations: [
    GridDeviceItemComponent,
    ListDeviceItemComponent,
    LargeListItemComponent,
    SingleAccordionContainerComponent,
    PopitContainerComponent,
    ButtonGroupWithToggle,
    RangeWithToggle,
    LargeToggleWithRange,
    LargeToggle,
    SimpleButtonGroup,
    SimpleRange,
    CustomRange,
    SimpleText,
    SimpleToggle,
    GroupBagComponent,
    DeviceBagComponent,
    GroupItemWrapperComponent,
    ExtraPageSpaceComponent,
    ScrollableTabs,
    GroupControlPanelComponent,
    DeviceItemWrapperComponent,
    GridGroupItemComponent,
    ListGroupItemComponent,
    EmptyDevicesComponent,
    EmptyGroupDevicesComponent,
    PopitGroupControlComponent,
    ButtonGroupControlComponent,
    GrayButtonGroupControlComponent,
    PageNav,
    GdprAlertComponent,
    TermsOfServiceComponent,
    LanguageSelectorComponent,
    EchartsCore,
    LineChart,
    BarChart,
    LastErrorComponent,
  ],
  imports: [
    DynamicModule.withComponents([]), // It's already declared in the entryComponents
    IonicModule,
    PipesModule,
    TranslateModule,
    ImageCacheModule,
    InformationModelModule,
    DirectivesModule,
    NgxEchartsModule,
  ],
  exports: [
    GridDeviceItemComponent,
    ListDeviceItemComponent,
    LargeListItemComponent,
    SingleAccordionContainerComponent,
    PopitContainerComponent,
    ButtonGroupWithToggle,
    RangeWithToggle,
    LargeToggleWithRange,
    LargeToggle,
    SimpleButtonGroup,
    SimpleRange,
    CustomRange,
    SimpleText,
    SimpleToggle,
    GroupBagComponent,
    DeviceBagComponent,
    GroupItemWrapperComponent,
    ExtraPageSpaceComponent,
    ScrollableTabs,
    GroupControlPanelComponent,
    DeviceItemWrapperComponent,
    GridGroupItemComponent,
    ListGroupItemComponent,
    EmptyDevicesComponent,
    EmptyGroupDevicesComponent,
    PopitGroupControlComponent,
    ButtonGroupControlComponent,
    GrayButtonGroupControlComponent,
    PageNav,
    GdprAlertComponent,
    TermsOfServiceComponent,
    LanguageSelectorComponent,
    EchartsCore,
    LineChart,
    BarChart,
    LastErrorComponent,
  ],
  entryComponents: [
    GridDeviceItemComponent,
    ListDeviceItemComponent,
    LargeListItemComponent,
    SingleAccordionContainerComponent,
    PopitContainerComponent,
    ButtonGroupWithToggle,
    RangeWithToggle,
    LargeToggleWithRange,
    LargeToggle,
    SimpleButtonGroup,
    SimpleRange,
    CustomRange,
    SimpleText,
    SimpleToggle,
    GroupBagComponent,
    DeviceBagComponent,
    GroupItemWrapperComponent,
    ExtraPageSpaceComponent,
    ScrollableTabs,
    GroupControlPanelComponent,
    DeviceItemWrapperComponent,
    GridGroupItemComponent,
    ListGroupItemComponent,
    EmptyDevicesComponent,
    EmptyGroupDevicesComponent,
    PopitGroupControlComponent,
    ButtonGroupControlComponent,
    GrayButtonGroupControlComponent,
    PageNav,
    GdprAlertComponent,
    TermsOfServiceComponent,
    EchartsCore,
    LineChart,
    BarChart,
    LastErrorComponent,
  ],
  providers: [
    PageRouteManager,
    EchartsService,
    TrackService,
  ]
})
export class ComponentsModule {}
