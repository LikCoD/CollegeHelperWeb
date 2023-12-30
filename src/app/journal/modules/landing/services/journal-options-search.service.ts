import { Injectable } from '@angular/core';
import { debounceTime, map, merge, Observable, of, Subject, Subscription } from 'rxjs';
import { JournalOption } from '@journal/modules/landing/entities/options';

@Injectable({
  providedIn: 'root',
})
export class JournalOptionsSearchService {
  private _search$ = new Subject<string>();

  get search$(): Observable<string> {
    return this._search$.asObservable();
  }

  private static filterOption(option: JournalOption, search: string | null): boolean {
    if (!search) return true;

    return !![
      option.group.group.toLowerCase(),
      option.teacher.teacher.toLowerCase(),
      option.subject.subject.toLowerCase(),
    ].find(v => v.indexOf(search) !== -1);
  }

  searchItems$(items: JournalOption[]): Observable<JournalOption[]> {
    return merge(this.search$, of(null)).pipe(
      map(s => items.filter(i => JournalOptionsSearchService.filterOption(i, s)))
    );
  }

  registerSearch(search: Observable<string | null>): Subscription {
    return search
      .pipe(debounceTime(150))
      .subscribe(input => this._search$.next(input?.toLowerCase()?.trim() ?? ''));
  }
}
