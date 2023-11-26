import { Injectable, Signal, signal } from '@angular/core';
import { Locale } from '../entities/i18n.entity';

@Injectable({
  providedIn: 'root',
})
export class LocalesService {
  private _default = this.getSystemLocale();
  private _current$ = signal(this._default);

  private _availableLocales: Locale[] | null = null;

  set availableLocales(value: (Locale | string)[]) {
    this._availableLocales = value.map(l =>
      typeof l === 'string' ? this.convertStringToLocale(l) : l
    );
    this.syncLocales();
  }

  get current(): Signal<Locale> {
    return this._current$.asReadonly();
  }

  set current(locale: Locale) {
    this._current$.set(locale);
  }

  private getSystemLocale(): Locale {
    return this.convertStringToLocale(navigator.languages[0]);
  }

  private convertStringToLocale(value: string): Locale {
    return {
      code: value,
    };
  }

  private syncLocales(): void {
    if (!this._availableLocales) return;

    if (!this._availableLocales.find(l => l.code === this._default.code)) {
      this._default = this._availableLocales[0];
    }

    if (!this._availableLocales.find(l => l.code === this._current$().code)) {
      this._current$.set(this._default);
    }
  }
}
