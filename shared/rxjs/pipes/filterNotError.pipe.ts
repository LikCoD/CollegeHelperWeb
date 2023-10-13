import { Observable, pipe, UnaryFunction } from 'rxjs';
import { nullOnCatchError } from '@shared/rxjs/pipes/nullOnCatchError.pipe';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';

export const filterNotError = <T>(onError: (e: any) => void = () => {}): UnaryFunction<Observable<T>, Observable<T>> =>
    pipe(
      nullOnCatchError(onError),
      filterNotNull()
    )
