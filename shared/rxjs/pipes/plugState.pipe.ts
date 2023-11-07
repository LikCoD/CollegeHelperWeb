import { map, Observable, pipe, tap, UnaryFunction } from 'rxjs';
import { runCatching } from '@shared/rxjs/pipes/runCatching.pipe';
import { Pluggable } from '@shared/components/plugable/pluggable.entites';

export const plugState =
  <T, D>(
    operators: UnaryFunction<Observable<T>, Observable<D>> = pipe(map(v => v as any as D))
  ): UnaryFunction<Observable<T>, Observable<Pluggable<D>>> =>
  source =>
    new Observable(subscriber => {
      const subscription = source
        .pipe(tap(() => subscriber.next({ plug: { type: 'loading' } })))
        .pipe(
          runCatching(operators, e =>
            subscriber.next({ plug: { type: 'error', text: 'error' }, data: e })
          )
        )
        .subscribe({
          next: value => {
            if (!value) subscriber.next({ plug: { type: 'empty', text: 'noData' } });
            else subscriber.next({ plug: { type: 'loaded' }, data: value });
          },
          error: (e: Error) => subscriber.next({ plug: { type: 'error', text: 'error' }, data: e }),
          complete: () => subscriber.complete(),
        });

      return () => subscription.unsubscribe();
    });
