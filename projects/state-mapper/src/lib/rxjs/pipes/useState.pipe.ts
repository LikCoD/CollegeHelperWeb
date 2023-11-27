import { catchError, Observable, OperatorFunction, pipe, tap, throwError } from 'rxjs';
import { ReservedStates } from '../../entities/states.entities';

export const useState =
  <T, D>(
    operator: OperatorFunction<T, D>,
    ignoreErrors: boolean = true
  ): OperatorFunction<T, ReservedStates<D>> =>
  source =>
    new Observable(subscriber => {
      const subscription = source
        .pipe(tap(() => subscriber.next({ state: 'loading' })))
        .pipe(runCatching(operator, e => subscriber.next({ state: 'error', error: e })))
        .subscribe({
          next: value => {
            if (!value) subscriber.next({ state: 'empty' });
            else subscriber.next({ state: 'loaded', data: value });
          },
          error: (e: Error) => {
            subscriber.next({ state: 'error', error: e });
            if (!ignoreErrors) subscriber.error(e);
          },
          complete: () => subscriber.complete(),
        });

      return () => subscription.unsubscribe();
    });

const runCatching =
  <T, D>(
    operator: OperatorFunction<T, D>,
    onError: (e: Error) => void = () => {}
  ): OperatorFunction<T, D> =>
  (source: Observable<T>): Observable<D> =>
    pipe(operator)(source).pipe(
      catchError(error => {
        console.error(error);
        onError(error);
        return throwError(() => {});
      })
    );
