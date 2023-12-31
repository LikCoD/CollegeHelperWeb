import { filter, map, Observable, pipe, UnaryFunction } from 'rxjs';

export const filterIsNull = <T>(): UnaryFunction<
  Observable<T | null | undefined>,
  Observable<null>
> =>
  pipe(
    filter(v => v === null || v === undefined),
    map(v => null)
  );
