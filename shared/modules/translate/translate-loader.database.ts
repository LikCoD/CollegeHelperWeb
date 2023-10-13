import { map, Observable, ReplaySubject, Subject, take } from 'rxjs';
import { TranslateEntry } from '@translate/translate-loader.entities';

//todo create helper db class
export class TranslateLoaderDatabase {
  private i18nDB = new ReplaySubject<IDBDatabase>(1);

  constructor() {
    const db = indexedDB.open('i18n', 1);
    db.addEventListener('success', e => {
      this.i18nDB.next((e.target as IDBRequest).result as IDBDatabase);
    });


    db.addEventListener('upgradeneeded', e => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (db.objectStoreNames.contains('translations')) db.deleteObjectStore('translations');
      const store = db.createObjectStore('translations');
      store.createIndex('translation_hash', 'hash');
      store.createIndex('translation', 'translation');
    });
  }

  add(entry: TranslateEntry): Observable<any> {
    entry.group = this.parseGroup(entry.group)
    return this.query(s => s.add(entry, `${entry.language}:${entry.group}`));
  }

  get(lang: string, group: string): Observable<TranslateEntry | null> {
    const parsedGroup = this.parseGroup(group)
    return this.query(s => s.get(`${lang}:${parsedGroup}`));
  }

  delete(lang: string, group: string): Observable<void> {
    const parsedGroup = this.parseGroup(group)
    return this.query(s => s.delete(`${lang}:${parsedGroup}`));
  }

  update(entry: TranslateEntry): Observable<string> {
    entry.group = this.parseGroup(entry.group)
    return this.query(s => s.put(entry, `${entry.language}:${entry.group}`) as IDBRequest<string>);
  }

  private query<T>(f: (t: IDBObjectStore) => IDBRequest<T>): Observable<T> {
    const onSuccess$ = new Subject<T>();

    this.i18nDB
      .pipe(map(d => d.transaction('translations', 'readwrite').objectStore('translations')))
      .pipe(map(f))
      .pipe(take(1))
      .subscribe(r => {
        r.addEventListener('success', res => {
          onSuccess$.next((res.target! as unknown as { result: T }).result);
          onSuccess$.complete();
        });
      });

    return onSuccess$.asObservable();
  }

  private parseGroup(group: string): string {
    return group.replaceAll('.', '_')
  }
}