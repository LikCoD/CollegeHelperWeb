import {Injectable, Injector} from "@angular/core"
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {catchError, Observable, throwError} from "rxjs"
import {UserService} from "../services/core/user.service"

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
    //use injector to avoid https://angular.io/errors/NG0200 (B (this) depends on class A and class A depends on class B)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((v) => {
        if (v.status === 401) this.injector.get(UserService).signOutSilently()
        return throwError(v)
      })
    )
  }
}
