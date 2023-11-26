import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { StorageSubject } from '@shared/rxjs/subjects/storage.subject';
import { Preferences } from '@shared/entities/preferences';
import { Settings as LuxonSettings } from 'luxon';
import { JwtService } from '@jwt/jwt.service';
import { LocalesService } from 'i18n';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  themes = ['dark', 'light'];
  languages = ['en-US', 'ru-RU'];

  private http = inject(HttpClient);
  private translateService = inject(LocalesService);
  private service = inject(JwtService);

  private _preferences$: StorageSubject<Preferences> = new StorageSubject(
    () =>
      this.service.data
        ? this.http
            .get<Preferences>('api/v1/user/preferences')
            .pipe(tap(p => (this.preferences = p)))
        : of({} as any),
    { stopOnError: false, takeFirst: true, instantInit: true }
  );

  get preferences$(): Observable<Preferences> {
    return this._preferences$.asObservable();
  }

  set preferences(value: Preferences) {
    document.body.classList.remove(...this.themes);
    document.body.classList.add(value.theme);

    this.translateService.current = { code: value.language };

    if (value.timezone === 'device_timezone') {
      value.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    LuxonSettings.defaultZone = value.timezone;
    LuxonSettings.defaultLocale = value.language;

    this._preferences$.next(value);
  }
}
