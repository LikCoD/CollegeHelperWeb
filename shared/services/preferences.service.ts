import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageSubject } from '@shared/rxjs/subjects/storage.subject';
import { Preferences } from '@shared/entities/preferences';
import { TranslateLoaderService } from '@translate/translate-loader.service';
import { Settings as LuxonSettings } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  themes = ['dark', 'light'];
  languages = ['en_us', "ru_ru"]

  private http = inject(HttpClient);
  private translateService = inject(TranslateLoaderService);

  private _preferences$ = new StorageSubject(
    () => this.http.get<Preferences>('api/v1/user/preferences')
      .pipe(tap(p => this.preferences = p)),
    { stopOnError: false, takeFirst: true, instantInit: true },
  );

  get preferences$(): Observable<Preferences> {
    return this._preferences$.asObservable();
  }

  set preferences(value: Preferences) {
    document.body.classList.remove(...this.themes);
    document.body.classList.add(value.theme);

    this.translateService.language = value.language;

    if (value.timezone === 'device_timezone') {
      value.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    LuxonSettings.defaultZone = value.timezone
    LuxonSettings.defaultLocale = this.locale(value.language)

    this._preferences$.next(value);
  }

  private locale(language: string): string {
    const [p1, p2] = language.split("_")
    return `${p1}-${p2.toUpperCase()}`
  }
}
