import { APP_INITIALIZER, inject, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslateModule as NgxTranslateModule,
  TranslateModuleConfig as NgxTranslateModuleConfig,
  TranslateParser as NgxTranslateParser,
} from '@ngx-translate/core';
import { TranslateLoaderService } from '@translate/translate-loader.service';
import { TranslateParser } from '@translate/translate.parser';

@NgModule()
export class TranslateModule extends NgxTranslateModule {
  static http(url: string, def: string, config: NgxTranslateModuleConfig = {}): ModuleWithProviders<NgxTranslateModule> {
    config.parser = { provide: NgxTranslateParser, useClass: TranslateParser, deps: [Injector] };
    config.defaultLanguage = def;

    const loaderInitFactory = () => {
      const service = inject(TranslateLoaderService);
      service.language = def;
      service.url = url;
      return () => service;
    };

    const module = NgxTranslateModule.forRoot(config);
    return {
      ngModule: module.ngModule,
      providers: [
        ...module.providers ?? [],
        TranslateLoaderService,
        { provide: APP_INITIALIZER, useFactory: loaderInitFactory, multi: true },
      ],
    };
  }
}
