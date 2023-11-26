import { computed, inject, Injectable, Signal } from '@angular/core';
import { LoaderService } from './loader.service';
import { TranslateObject, TranslationParams } from '../entities/i18n.entity';
import { I18N_ON_NOT_FOUND_TOKEN } from '../providers/url.provider';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private loaderService = inject(LoaderService);
  private onNotFound =
    inject(I18N_ON_NOT_FOUND_TOKEN, { optional: true }) ?? ((o: TranslateObject) => o.key);

  translate(object: TranslateObject, params: TranslationParams = {}): Signal<string | number> {
    const key = object.group ? `${object.group.join('.')}.${object.key}` : object.key;
    if (object.group) this.loaderService.loadGroup(object.group);
    return computed(() =>
      this.applyParams(object, this.loaderService.translation()[key]?.value, params)
    );
  }

  translateReturningString(
    object: TranslateObject,
    params: TranslationParams = {}
  ): Signal<string> {
    return computed(() => `${this.translate(object, params)()}`);
  }

  translateReturningNumber(
    object: TranslateObject,
    params: TranslationParams = {}
  ): Signal<number> {
    return computed(() => +this.translate(object, params)());
  }

  private applyParams(
    object: TranslateObject,
    value: string | number,
    params: TranslationParams
  ): string | number {
    switch (typeof value) {
      case 'string':
        return this.applyStringParams(value, params);
      case 'number':
        return this.applyNumberParams(value, params);
      case 'undefined':
        return object.onNotFound ? object.onNotFound(object) : this.onNotFound(object);
      default:
        return `${value}`;
    }
  }

  private applyStringParams(value: string, params: TranslationParams): string {
    let translation = value;
    for (const paramsKey in params) {
      translation = translation.replaceAll(`{{${paramsKey}}}`, `${params[paramsKey]}`);
    }
    return translation;
  }

  private applyNumberParams(value: number, _: TranslationParams): number {
    return value;
  }
}
