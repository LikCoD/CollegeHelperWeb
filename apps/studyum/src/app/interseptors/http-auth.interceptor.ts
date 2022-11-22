import {Injectable} from "@angular/core"
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {catchError, Observable, throwError} from "rxjs"
import {UserService} from "../services/shared/user.service"

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(v => {
      if (v.status === 401) this.userService.signOutSilently()
      return throwError(v);
    }))
  }
}
