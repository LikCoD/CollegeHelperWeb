import {Injectable} from "@angular/core"
import {BehaviorSubject, finalize, map, Observable} from "rxjs"
import jwtDecode from "jwt-decode"
import {Data, UserPreview} from "./jwt.models"
import * as moment from "moment"
import {HttpClient, HttpResponse} from "@angular/common/http"

@Injectable({
  providedIn: "root"
})
export class JwtService {
  static readonly UPDATE_URL = "/api/user/updateToken"
  static readonly REFRESH_TOKEN_NAME = "refresh_token"
  static readonly ACCESS_TOKEN_NAME = "access_token"
  static readonly SECOND_TO_NEED_UPDATE = 30

  get access() {
    return localStorage.getItem(JwtService.ACCESS_TOKEN_NAME) ?? ""
  }

  set access(value: string) {
    localStorage.setItem(JwtService.ACCESS_TOKEN_NAME, value)
    this._data$.next(this.decode())
  }

  get refresh() {
    return localStorage.getItem(JwtService.REFRESH_TOKEN_NAME) ?? ""
  }

  set refresh(value: string) {
    localStorage.setItem(JwtService.REFRESH_TOKEN_NAME, value)
  }

  get tokens() {
    return [this.access, this.refresh]
  }

  get updatingChanges() {
    return this._updating$.asObservable()
  }

  get isUpdating() {
    return this._updating$.value
  }

  get data(): Data | null {
    return this._data$.value
  }

  get userPreview$(): Observable<UserPreview | null> {
    return this._data$.pipe(map(v => v?.claims ?? null))
  }

  constructor(private http: HttpClient) {
  }

  removeTokens(): void {
    localStorage.removeItem(JwtService.REFRESH_TOKEN_NAME)
    localStorage.removeItem(JwtService.ACCESS_TOKEN_NAME)
  }

  isNeedUpdate(): boolean {
    //if null -> return false
    //null will be if res < JwtService.SECOND_TO_NEED_UPDATE,
    //so JwtService.SECOND_TO_NEED_UPDATE < JwtService.SECOND_TO_NEED_UPDATE = false
    return (this.expireDifferenceBetweenNow() ?? JwtService.SECOND_TO_NEED_UPDATE) < JwtService.SECOND_TO_NEED_UPDATE
  }

  isMustUpdate(): boolean {
    //if null -> return false
    //null will be if res <= 0,
    //so 1 <= 0 = false
    return (this.expireDifferenceBetweenNow() ?? 1) <= 0
  }

  expireDifferenceBetweenNow(): number | null {
    return this.data?.exp.diff(moment.now(), "second") ?? null
  }

  update(): Observable<HttpResponse<void>> {
    this._updating$.next(true)
    return this.http
      .put<void>(JwtService.UPDATE_URL, `"${this.refresh}"`, {observe: "response"})
      .pipe(finalize(() => this._updating$.next(false)))
  }

  private _updating$ = new BehaviorSubject<boolean>(false)
  private _data$ = new BehaviorSubject<Data | null>(this.decode())

  private decode(): Data | null {
    try {
      const data = jwtDecode<Data>(this.access)
      data.exp = moment(data.exp as any * 1000)
      return data
    } catch (error) {
      return null
    }
  }
}
