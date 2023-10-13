import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Request {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}