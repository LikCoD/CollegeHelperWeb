import { isObservable, map, Observable, of, pipe, switchMap, tap, UnaryFunction } from 'rxjs';

export const cacheable = <T>(loader: (i: string | number | symbol) => T | Observable<T>, cacheable: boolean = true): UnaryFunction<Observable<string | number | symbol>, Observable<T>> => {
  if (!cacheable) return pipe(map(v => v as unknown as T));

  const storage: { [key: string | number | symbol]: T } = {};
  const loadFromStorage = (key: string | number | symbol): Observable<T> => {
    if (storage[key]) return of(storage[key]);

    let loaded = loader(key);
    if (!isObservable(loaded)) loaded = of(loaded);

    return loaded.pipe(tap(v => storage[key] = v));
  };

  return pipe(switchMap(loadFromStorage));
};