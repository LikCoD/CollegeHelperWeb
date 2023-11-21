import { Observable, UnaryFunction } from 'rxjs';

export const filterNotError =
  <T>(onError: (e: any) => void = () => {}): UnaryFunction<Observable<T>, Observable<T>> =>
  source =>
    new Observable(subscriber => {
      const subscription = source.subscribe({
        next: value => subscriber.next(value),
        error: e => onError(e),
        complete: () => subscriber.complete(),
      });

      return () => subscription.unsubscribe();
    });
