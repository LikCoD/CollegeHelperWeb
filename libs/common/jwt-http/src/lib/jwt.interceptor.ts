import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from "@angular/common/http"
import {inject} from "@angular/core"
import {JwtService} from "./jwt.service"
import {catchError, filter, map, mergeMap, Observable, take, tap, throwError} from "rxjs"


export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  if (!req.url.startsWith("/api") || req.url === JwtService.UPDATE_URL) return next(req)
  const service = inject(JwtService)

  const setTokensPipe = tap((e: HttpResponse<any>) => {
    if (!e) return
    if (e.headers.has("SetAccessToken")) {
      service.access = e.headers.get("SetAccessToken") ?? ""
    }

    if (e.headers.has("SetRefreshToken")) {
      service.refresh = e.headers.get("SetRefreshToken") ?? ""
    }
  })

  const nextWithToken = () => next(addToken())
    .pipe(filter(e => e instanceof HttpResponse))
    .pipe(map(e => e as HttpResponse<any>))
    .pipe(setTokensPipe)
    .pipe(catchError(onError))

  const addToken = (): HttpRequest<any> => {
    return req.clone({setHeaders: {Authorization: service.access}})
  }

  const updateAndExecute = (): Observable<any> =>
    service.update().pipe(setTokensPipe, mergeMap(nextWithToken))

  const waitUpdateAndExecute = (): Observable<any> => service.updatingChanges
    .pipe(filter(v => !v), take(1))
    .pipe(mergeMap(nextWithToken))

  const onError = (err: any): Observable<any> => {
    if (!(err instanceof HttpErrorResponse)) return throwError(() => err)
    const httpErr: HttpErrorResponse = err as HttpErrorResponse
    if (httpErr.status !== 401) return throwError(() => err)

    if (httpErr.error !== "access token has expired") {
      service.removeTokens()
      return throwError(() => err)
    }

    return service.isUpdating ? waitUpdateAndExecute() : updateAndExecute()
  }

  if (service.isUpdating) return waitUpdateAndExecute()
  if (service.isMustUpdate()) return updateAndExecute()

  if (service.isNeedUpdate()) {
    service.update().pipe(take(1), setTokensPipe).subscribe()
    return nextWithToken()
  }

  return nextWithToken()
}
