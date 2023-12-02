import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { z } from 'zod';
import { validate } from '@shared/rxjs/pipes/validate';
import { Observable, tap, UnaryFunction } from 'rxjs';

export const CRUD_URL_TOKEN = new InjectionToken<string>('crud url');

@Injectable()
export class CrudService<T, DTO = T, ID = string> {
  protected schema: z.Schema | null = null;
  protected onAction: { [key: string]: (response: any, request: any) => void } = {};
  private http = inject(HttpClient);

  constructor(@Inject(CRUD_URL_TOKEN) protected url: string) {}

  list(): Observable<T[]> {
    return this.http
      .get<T[]>(this.url)
      .pipe(validate(z.array(this.schema ?? z.any())))
      .pipe(this.applyAction('LIST'));
  }

  get(id: ID): Observable<T> {
    return this.http
      .get<T>(`${this.url}/${id}`)
      .pipe(validate(this.schema))
      .pipe(this.applyAction('GET'));
  }

  put(id: ID, dto: DTO, previous: T | null = null): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${id}`, dto)
      .pipe(validate(this.schema))
      .pipe(this.applyAction('PUT', previous));
  }

  post(dto: DTO): Observable<T> {
    return this.http
      .post<T>(this.url, dto)
      .pipe(validate(this.schema))
      .pipe(this.applyAction('POST'));
  }

  delete(id: ID, previous: T | null = null): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(this.applyAction('DELETE', previous));
  }

  private applyAction<O, T>(
    action: string,
    previous: T | null = null
  ): UnaryFunction<Observable<O>, Observable<O>> {
    return tap(v => (this.onAction[action] ? this.onAction[action](v, previous) : null));
  }
}
