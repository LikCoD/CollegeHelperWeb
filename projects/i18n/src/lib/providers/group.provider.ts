import { inject, InjectionToken, Provider } from '@angular/core';
import { LoaderService } from '../services/loader.service';

export const I18N_GROUP_TOKEN = new InjectionToken<string[]>('translation group');

function append(value1: string | string[], value2: string | string[]): string[] {
  value1 = typeof value1 === 'string' ? [value1] : value1;
  value2 = typeof value2 === 'string' ? [value2] : value2;

  return [...value1, ...value2];
}

export function provideTranslationGroup(group: string | string[]): Provider {
  return {
    provide: I18N_GROUP_TOKEN,
    useFactory: () => {
      inject(LoaderService).loadGroup(group);
      return typeof group === 'string' ? [group] : group;
    },
  };
}

export function provideTranslationPrefix(prefix: string | string[]): Provider {
  return {
    provide: I18N_GROUP_TOKEN,
    useFactory: () => {
      const previous =
        inject(I18N_GROUP_TOKEN, {
          skipSelf: true,
          optional: true,
        }) ?? [];
      const group = append(previous, prefix);
      inject(LoaderService).loadGroup(group);
      return group;
    },
  };
}

export function provideTranslationSuffix(suffix: string | string[]): Provider {
  return {
    provide: I18N_GROUP_TOKEN,
    useFactory: () => {
      const previous =
        inject(I18N_GROUP_TOKEN, {
          skipSelf: true,
          optional: true,
        }) ?? [];
      const group = append(suffix, previous);
      inject(LoaderService).loadGroup(group);
      return group;
    },
  };
}
