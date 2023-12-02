import { map, Observable, UnaryFunction } from 'rxjs';
import { z } from 'zod';

export type Schema<T> = z.Schema | ((value: T) => z.Schema) | null;

export const validate = <T>(schema: Schema<T>): UnaryFunction<Observable<T>, Observable<T>> =>
  map(value => parseSchema(schema, value).parse(value));

const parseSchema = <T>(schema: Schema<T>, value: T): z.Schema =>
  schema ? (typeof schema === 'function' ? schema(value) : schema) : z.any();
