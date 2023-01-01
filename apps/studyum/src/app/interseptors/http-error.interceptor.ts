import {Injectable} from "@angular/core"
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {catchError, Observable, throwError} from "rxjs"
import {ToastService} from "../services/ui/toast.service"

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      this.toastService.show(`(${err.status}) - ${err.error}`)
      return throwError(err)
    }))
  }
}
