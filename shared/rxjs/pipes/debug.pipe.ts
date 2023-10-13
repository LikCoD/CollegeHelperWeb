import { Observable, tap, UnaryFunction } from 'rxjs';

export const debug = <T>(prefix: string = '-'): UnaryFunction<Observable<T>, Observable<T>> => tap({
  next: v => console.log(`[${prefix}] -> next`, deepCopy(v)),
  error: v => console.error(`[${prefix}] -> error`, deepCopy(v)),
  complete: () => console.log(`[${prefix}] -> completed`),
});

const deepCopy = <T>(v: T): T => {
  if (!v) return v;
  return JSON.parse(JSON.stringify(v));
};