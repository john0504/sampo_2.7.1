import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';

import { ImageCacheService } from './image-cache.service';
import { ImageLazyLoadDirective } from './image-lazy-load.directive';
import { ResourceDownloader } from './resource-downloader';
import { WebView } from '../../providers/webview';

const declarations = [
  ImageLazyLoadDirective
];

@NgModule({
  declarations: [...declarations],
  exports: [...declarations]
})
export class ImageCacheModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageCacheModule,
      providers: [
        ImageCacheService,
        ResourceDownloader,
        File,
        HTTP,
        WebView,
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ImageCacheModule) { }
}
