import { inject, InjectionToken, Injector, Provider } from '@angular/core';
import { TranslateModule as NgxTranslateModule, TranslateParser as NgxTranslateParser } from '@ngx-translate/core';
import { TranslateLoaderService } from '@translate/translate-loader.service';
import { TranslateParser } from '@translate/translate.parser';

export const translatePrefixProviderToken = new InjectionToken<string>('prefix');

export const translatePrefixProvider = (prefix: string): Provider[] => [
  {
    provide: translatePrefixProviderToken,
    deps: [Injector],
    useFactory: (injector: Injector): string => {
      const previous = inject(translatePrefixProviderToken, { skipSelf: true, optional: true });
      const current = !previous ? prefix : `${previous}.${prefix}`
      injector.get(TranslateLoaderService).addGroup(current)

      return current;
    },
  },
  NgxTranslateModule.forChild({
    parser: {
      provide: NgxTranslateParser,
      useClass: TranslateParser,
      deps: [Injector],
    },
  }).providers ?? [],
];