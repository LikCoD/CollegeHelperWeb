import { inject, Injectable } from '@angular/core';
import { PreferencesService } from '@shared/services/preferences.service';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { Preferences } from '@shared/entities/preferences';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private preferencesService = inject(PreferencesService)
  preferences$ = this.preferencesService.preferences$;

  updateFormOptions: SubmitOptions = {
    url: 'api/v1/user/preferences',
    method: 'PUT',
    subscribe: true,
  };

  themes = this.preferencesService.themes
  languages = this.preferencesService.languages

  timezones: string[] = [
    'device_timezone',
    'UTC-12',
    'UTC-11',
    'UTC-10',
    'UTC-9:30',
    'UTC-9',
    'UTC-8',
    'UTC-7',
    'UTC-6',
    'UTC-5',
    'UTC-4',
    'UTC-3:30',
    'UTC-3',
    'UTC-2',
    'UTC-1',
    'UTC',
    'UTC+1',
    'UTC+2',
    'UTC+3',
    'UTC+3:30',
    'UTC+4',
    'UTC+4:30',
    'UTC+5',
    'UTC+5:30',
    'UTC+5:45',
    'UTC+6',
    'UTC+6:30',
    'UTC+7',
    'UTC+8',
    'UTC+8:45',
    'UTC+9',
    'UTC+9:30',
    'UTC+10',
    'UTC+10:30',
    'UTC+11',
    'UTC+12',
    'UTC+12:45',
    'UTC+13',
    'UTC+14',
    ...this.intlTimezones()
  ] //todo move somewhere

  updatePreferences(preferences: Preferences): void {
    this.preferencesService.preferences = preferences
  }

  private intlTimezones(): string[] {
    const intl = Intl as any
    if (!intl.supportedValuesOf) return []

    const timezones = intl.supportedValuesOf('timeZone') as string[]
    timezones.pop()
    return timezones
  }
}