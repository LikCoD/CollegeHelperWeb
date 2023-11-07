import { Observable, of, switchMap, UnaryFunction } from 'rxjs';
import { filterNotError } from '@shared/rxjs/pipes/filterNotError.pipe';

export const runCatching = <T, D>(
  operator: UnaryFunction<Observable<T>, Observable<D>>,
  onError: (e: Error) => void = () => {}
): UnaryFunction<Observable<T>, Observable<D>> =>
  switchMap(d => of(d).pipe(operator, filterNotError(onError)));
