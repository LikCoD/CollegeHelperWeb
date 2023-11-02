import { filter, map, Observable, pipe, tap, UnaryFunction } from 'rxjs';

export const filterNotNull = <T>(onNull: () => void = () => {}): UnaryFunction<Observable<T | null | undefined>, Observable<T>> =>
  pipe(
    tap(v => (v === null || v === undefined) && onNull()),
    filter(v => v !== null && v !== undefined),
    map(v => v!),
  );
