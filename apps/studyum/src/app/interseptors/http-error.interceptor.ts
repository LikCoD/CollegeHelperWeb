import {Injectable} from "@angular/core"
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http"
import {catchError, Observable, retry, throwError, timer} from "rxjs"
import {ToastService} from "../services/ui/toast.service"

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) return throwError(() => err)
        this.toastService.showError(`(${err.status}) - ${err.error}`)
        return throwError(() => err)
      }),
      retry({
        count: 4,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          switch (error.status) {
            case 408:
            case 409:
            case 412:
            case 425:
            case 429:
            case 503:
            case 504:
              return timer(500 * retryCount)
            default:
              return throwError(() => error)
          }
        },
      })
    )
  }
}
