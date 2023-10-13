import { filter, map, Observable, pipe, UnaryFunction } from 'rxjs';

export const filterNotNull = <T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> =>
  pipe(
    filter(v => v !== null && v !== undefined),
    map(v => v!)
  );
