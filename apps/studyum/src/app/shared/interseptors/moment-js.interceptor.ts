import {Injectable} from "@angular/core"
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http"
import {Observable, tap} from "rxjs"
import * as moment from "moment"

@Injectable()
export class MomentJsInterceptor implements HttpInterceptor {
  public static readonly DATE_REGEX = /^\d{4}(-\d{2}){2}T(\d{2}:){2}\d{2}Z$/

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (!(event instanceof HttpResponse)) return
        this.convertToDate(event.body)
      })
    )
  }

  convertToDate(body: any) {
    if (!body) return body
    if (typeof body !== "object") return body

    for (const key of Object.keys(body)) {
      const value = body[key]
      if (typeof value === "object") {
        this.convertToDate(value)
        continue
      }

      if (!this.isIso8601(value)) continue
      body[key] = moment.utc(value)
    }
  }

  isIso8601(value: any) {
    return !!value ? MomentJsInterceptor.DATE_REGEX.test(value) : false
  }
}
