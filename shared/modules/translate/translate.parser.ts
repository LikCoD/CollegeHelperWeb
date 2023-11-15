import { TranslateDefaultParser } from '@ngx-translate/core';
import { Injector } from '@angular/core';
import { TranslateLoaderService } from '@translate/translate-loader.service';
import { map, Observable, scan } from 'rxjs';
import { translatePrefixProviderToken } from '@translate/translate.prefix-provider';

export class TranslateParser extends TranslateDefaultParser {
  private values$: { [key: string]: Observable<any> } = {};

  constructor(private injector: Injector) {
    super();
  }

  override getValue(_: any, key: string): any {
    const prefix = this.injector.get(translatePrefixProviderToken, null);
    return (this.values$[key] ??= this.injector
      .get(TranslateLoaderService)
      .translation$.pipe(map(t => this.value(t, prefix, key)))
      .pipe(scan((previous, current) => current ?? previous)));
  }

  value(target: any, prefix: string | null, key: string): any {
    const prefixedValue = super.getValue(target, prefix ? `${prefix}.${key}` : key);
    const value = prefixedValue ?? super.getValue(target, key);
    if (typeof value === 'object' || !value) return key;
    return value;
  }
}
