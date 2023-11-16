import { inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoaderDatabase } from '@translate/translate-loader.database';
import { Translation, TranslationWithHash } from '@translate/translate.entities';
import { TranslateEntry } from '@translate/translate-loader.entities';

@Injectable({
  providedIn: 'root',
})
export class TranslateLoaderService {
  translation: any = {};

  private url$ = new BehaviorSubject<string | null>(null);
  private language$ = new BehaviorSubject<string | null>(null);
  private groups$ = new BehaviorSubject<Set<string>>(new Set());
  private groupAdd$ = new Subject<string>();
  private rawTranslation$ = new BehaviorSubject<Translation | null>(null);
  private storage = new TranslateLoaderDatabase();
  private http = inject(HttpClient);
  private injector = inject(Injector);

  constructor() {
    const changes = this.language$
      .pipe(filterNotNull())
      .pipe(switchMap(() => this.url$))
      .pipe(filterNotNull());

    const defaults$ = changes
      .pipe(mergeMap(this.loadDefaults.bind(this)))
      .pipe(map(t => (this.translation = { ...this.translation, ...t })));

    const translation$ = changes.pipe(switchMap(this.loadTranslations.bind(this)));

    const groupAdd$ = this.groupAdd$.pipe(
      mergeMap(g => this.loadTranslation(g).pipe(map(v => this.appendTranslation(g, v))))
    );

    merge(defaults$, translation$, groupAdd$)
      .pipe(
        tap(t => {
          const service = this.injector.get(TranslateService);
          service.setTranslation(service.currentLang ?? service.defaultLang, t);
        })
      )
      .subscribe(this.rawTranslation$);
  }

  get translation$(): Observable<Object> {
    return this.rawTranslation$.pipe(filterNotNull());
  }

  set url(value: string) {
    this.translation = {};
    this.url$.next(value);
  }

  set language(value: string) {
    this.translation = {};
    this.language$.next(value);
  }

  addGroup(group: string): void {
    const groups = this.groups$.value;
    if (groups.has(group)) return;

    groups.add(group);
    this.groups$.next(groups);
    this.groupAdd$.next(group);
  }

  private loadDefaults(): Observable<Translation> {
    return this.loadTranslation('');
  }

  private loadTranslations(): Observable<Translation> {
    const groups$: Observable<any>[] = [];
    this.groups$.value.forEach(g =>
      groups$.push(this.loadTranslation(g).pipe(tap(v => this.appendTranslation(g, v))))
    );

    return merge(...groups$).pipe(map(() => this.translation));
  }

  private loadTranslation(group: string): Observable<Translation> {
    const language = this.language$.value ?? '';
    return this.storage.get(language, group).pipe(
      switchMap(t => {
        const savedTranslation = of(t)
          .pipe(filterNotNull())
          .pipe(map(res => res.translation));

        const params: { [key: string]: any } = {};
        if (t?.hash) params['hash'] = t.hash;

        const http = this.http
          .get<TranslationWithHash>(`${this.url$.value}/${this.language$.value}/${group}`, {
            params: params,
          })
          .pipe(filter(res => res.hash !== t?.hash))
          .pipe(map(res => <TranslateEntry>{ ...res, group: group, language: language }))
          .pipe(
            switchMap(res =>
              (t ? this.storage.update(res) : this.storage.add(res)).pipe(
                map(() => res.translation)
              )
            )
          );

        return merge(savedTranslation, http);
      })
    );
  }

  private appendTranslation(group: string, value: Translation): any {
    if (Object.keys(value).length === 0) return;
    let temp = this.translation;
    group.split('.').forEach((segment, index, array) => {
      temp = index === array.length - 1 ? (temp[segment] = value) : (temp[segment] ??= {});
    });
    return this.translation;
  }
}
