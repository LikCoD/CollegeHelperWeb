import { filter, map, Observable, pipe, UnaryFunction } from 'rxjs';

export const filterInstanceOf = <T>(type: any): UnaryFunction<Observable<any>, Observable<T>> =>
  pipe(
    filter(v => v instanceof type),
    map(v => v as T)
  );
