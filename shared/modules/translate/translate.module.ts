import { APP_INITIALIZER, inject, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslateModule as NgxTranslateModule,
  TranslateModuleConfig as NgxTranslateModuleConfig,
  TranslateParser as NgxTranslateParser,
} from '@ngx-translate/core';
import { TranslateLoaderService } from '@translate/translate-loader.service';
import { TranslateParser } from '@translate/translate.parser';
import { Settings as LuxonSettings } from 'luxon';

@NgModule()
export class TranslateModule extends NgxTranslateModule {
  static http(
    url: string,
    def: string,
    config: NgxTranslateModuleConfig = {}
  ): ModuleWithProviders<NgxTranslateModule> {
    config.parser = { provide: NgxTranslateParser, useClass: TranslateParser, deps: [Injector] };
    config.defaultLanguage = def;
    LuxonSettings.defaultLocale = TranslateModule.locale(def);

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
        ...(module.providers ?? []),
        TranslateLoaderService,
        { provide: APP_INITIALIZER, useFactory: loaderInitFactory, multi: true },
      ],
    };
  }

  private static locale(language: string): string {
    const [p1, p2] = language.split('_');
    return `${p1}-${p2.toUpperCase()}`;
  }
}
