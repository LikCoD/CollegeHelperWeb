import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { I18N_LOADER_TOKEN } from '../providers/url.provider';
import { LocalesService } from './locales.service';
import { Locale, RawTranslation, Translation } from '../entities/i18n.entity';
import { TranslationDatabase } from '../databases/translation.database';
import { filter, map, take, tap } from 'rxjs';

interface LoadedTranslation {
  groups: string[];
  translation: RawTranslation;
  locale: Locale;
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private i18nLoader = inject(I18N_LOADER_TOKEN);
  private localesService = inject(LocalesService);

  private database = new TranslationDatabase();
  private loadedTranslations: { [key: string]: LoadedTranslation } = {};
  private groups: string[] = [];
  private previousLocale = this.localesService.current();

  constructor() {
    this.loadedTranslations[this.localesService.current().code] = {
      groups: [],
      translation: {},
      locale: this.localesService.current(),
    };
    //defaults
    this.loadGroup('');
    effect(
      () => {
        if (this.previousLocale.code === this.localesService.current().code) return;
        this.previousLocale = this.localesService.current();
        this.reloadLocale();
      },
      { allowSignalWrites: true }
    );
  }

  private _translation = signal<RawTranslation>({});

  get translation(): Signal<RawTranslation> {
    return this._translation.asReadonly();
  }

  loadGroup(group: string | string[], locale: Locale = this.localesService.current()): void {
    const _group = Array.isArray(group) ? group.join('.') : group;
    const groups = this.loadedTranslations[locale.code].groups;
    if (groups.indexOf(_group) !== -1) return;
    groups.push(_group);

    if (this.groups.indexOf(_group) === -1) this.groups.push(_group);

    this.database
      .get(locale, _group)
      .pipe(map(t => t?.translation))
      .pipe(take(1))
      .subscribe(t => this.appendTranslation(_group, t!, true));

    this.i18nLoader(locale, _group)
      .pipe(take(1))
      .pipe(filter(t => !!t))
      .pipe(tap(t => this.database.add({ locale: locale, group: _group, translation: t! })))
      .subscribe(t => this.appendTranslation(_group, t!));
  }

  private appendTranslation(group: string, value: Translation, isHash: boolean = false): void {
    if (!value || Object.keys(value).length === 0) return;
    let temp = { ...this._translation() };
    for (let valueKey in value) {
      const current = value[valueKey];
      if (typeof current === 'object') {
        this.appendTranslation(group, value[valueKey] as Translation);
        continue;
      }

      const key = `${group}.${valueKey}`;
      const prev = temp[key]?.value;
      const isPreviousHash = temp[key]?.isHash;
      if (prev && !isPreviousHash) {
        const tag = `[i18n] [${key}] ->`;
        if (prev === current) console.warn(`${tag} Previous '${prev}' equal with the new one`);
        else console.warn(`${tag} Previous '${prev}' replaced the new one '${current}'`);
      }

      temp[group === '' ? valueKey : `${group}.${valueKey}`] = { value: current, isHash: isHash };
    }

    this._translation.set(temp);
    this.loadedTranslations[this.localesService.current().code].translation = temp;
  }

  private reloadLocale(): void {
    const translation = (this.loadedTranslations[this.localesService.current().code] ??= {
      groups: [],
      translation: {},
      locale: this.localesService.current(),
    });
    this._translation.set(translation.translation);

    const groupsToLoad = this.groups.filter(g => translation.groups.indexOf(g) === -1);
    groupsToLoad.forEach(g => this.loadGroup(g));
  }
}
