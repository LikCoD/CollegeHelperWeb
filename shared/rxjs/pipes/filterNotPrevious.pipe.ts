import { Observable, UnaryFunction } from 'rxjs';

export const filterNotPrevious =
  <T>(
    initial: T | null = null,
    comparator: (t1: T, t2: T) => boolean = JSONComparator
  ): UnaryFunction<Observable<T>, Observable<T>> =>
  source =>
    new Observable(subscriber => {
      let previous: T | null = initial;
      const subscription = source.subscribe({
        next: value => {
          if (previous === null || !comparator(value, previous)) subscriber.next(value);
          previous = value;
        },
        complete: () => subscriber.complete(),
      });

      return () => subscription.unsubscribe();
    });

export const JSONComparator = (t1: any, t2: any) => JSON.stringify(t1) === JSON.stringify(t2);
