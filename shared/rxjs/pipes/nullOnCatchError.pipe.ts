import { catchError, Observable, of, UnaryFunction } from 'rxjs';

export const nullOnCatchError = <T>(onError: (e: any) => void = () => {}): UnaryFunction<Observable<T>, Observable<T | null>> =>
    catchError(v => {
      onError(v)
      return of(null);
    })
