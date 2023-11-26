import { InjectionToken, Provider } from '@angular/core';
import { Locale, TranslateObject, Translation } from '../entities/i18n.entity';
import { map, Observable } from 'rxjs';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export type I18nLoader = (locale: Locale, group: string | null) => Observable<Translation>;

export const I18N_LOADER_TOKEN = new InjectionToken<I18nLoader>('translation loader');
export const LocaleTemplate = 'locale';
export const GroupTemplate = 'group';

export type OnNotFound = (o: TranslateObject) => string;
export const I18N_ON_NOT_FOUND_TOKEN = new InjectionToken<OnNotFound>('translation loader');

interface Options {
  headers: Params;
  query: Params;
}

function insertVariable(str: string, variable: string, value: string): string {
  return str.replaceAll(`{{${variable}}}`, value);
}

function insertLocaleAndGroup(str: string, locale: Locale, group: string | null): string {
  str = insertVariable(str, LocaleTemplate, locale.code);
  str = insertVariable(str, GroupTemplate, group ?? '');
  return str;
}

function buildURL(template: string, locale: Locale, group: string | null): string {
  return insertLocaleAndGroup(template, locale, group);
}

function buildOptions(
  query: Params,
  headers: Params,
  locale: Locale,
  group: string | null
): Options {
  for (const queryKey in query) {
    query[queryKey] = insertLocaleAndGroup(query[queryKey], locale, group);
  }

  for (const headersKey in headers) {
    headers[headersKey] = insertLocaleAndGroup(headers[headersKey], locale, group);
  }

  return {
    query: query,
    headers: headers,
  };
}

export interface ProvideI18nHttpLoaderOptions<T = Translation> {
  method?: string;
  query?: Params;
  headers?: Params;
  transform?: (translation: T) => Translation;
  onNotFound?: (object: TranslateObject) => string;
}

export function provideI18nHttpLoader<T = Translation>(
  url: string,
  {
    method = 'GET',
    query = {},
    headers = {},
    transform = t => t as Translation,
    onNotFound = o => o.key,
  }: ProvideI18nHttpLoaderOptions<T> = {}
): Provider[] {
  return [
    {
      provide: I18N_LOADER_TOKEN,
      useFactory:
        (http: HttpClient) =>
        (locale: Locale, group: string | null = null): Observable<Translation> => {
          const _url = buildURL(url, locale, group);
          const _options = buildOptions(query, headers, locale, group);
          return http.request<T>(method, _url, _options).pipe(map(transform));
        },
      deps: [HttpClient],
    },
    {
      provide: I18N_ON_NOT_FOUND_TOKEN,
      useValue: onNotFound,
    },
  ];
}
