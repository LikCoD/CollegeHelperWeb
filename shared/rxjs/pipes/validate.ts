import { map, Observable, UnaryFunction } from 'rxjs';
import { z } from 'zod';

export const validate = <T>(schema: z.Schema): UnaryFunction<Observable<T>, Observable<T>> =>
  map(value => schema.parse(value))