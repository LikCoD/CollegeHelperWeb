import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Data, StudyPlaceInfo, UserPreview } from './jwt.models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  static readonly UPDATE_URL = 'api/v1/user/updateToken';
  static readonly REFRESH_TOKEN_NAME = 'refresh_token';
  static readonly ACCESS_TOKEN_NAME = 'access_token';
  static readonly SECOND_TO_NEED_UPDATE = 30;

  private _updating$ = new BehaviorSubject<boolean>(false);
  private _data$ = new BehaviorSubject<Data | null>(this.decode());
  private http = inject(HttpClient);

  get access(): string {
    return localStorage.getItem(JwtService.ACCESS_TOKEN_NAME) ?? '';
  }

  set access(value: string) {
    localStorage.setItem(JwtService.ACCESS_TOKEN_NAME, value);
    this._data$.next(this.decode());
  }

  get refresh(): string {
    return localStorage.getItem(JwtService.REFRESH_TOKEN_NAME) ?? '';
  }

  set refresh(value: string) {
    localStorage.setItem(JwtService.REFRESH_TOKEN_NAME, value);
  }

  get tokens(): [string, string] {
    return [this.access, this.refresh];
  }

  get updatingChanges() {
    return this._updating$.asObservable();
  }

  get isUpdating(): boolean {
    return this._updating$.value;
  }

  get data(): Data | null {
    return this._data$.value;
  }

  get userPreview$(): Observable<UserPreview | null> {
    return this._data$.pipe(map(v => v?.claims ?? null));
  }

  get userStudyPlace$(): Observable<StudyPlaceInfo | null> {
    return this.userPreview$.pipe(map(u => u?.studyPlaceInfo ?? null));
  }

  removeTokens(): void {
    localStorage.removeItem(JwtService.REFRESH_TOKEN_NAME);
    localStorage.removeItem(JwtService.ACCESS_TOKEN_NAME);
    this._data$.next(null);
  }

  isNeedUpdate(): boolean {
    //if null -> return false
    //null will be if res < JwtService.SECOND_TO_NEED_UPDATE,
    //so JwtService.SECOND_TO_NEED_UPDATE < JwtService.SECOND_TO_NEED_UPDATE = false
    return (
      (this.expireDifferenceBetweenNow() ?? JwtService.SECOND_TO_NEED_UPDATE) <
      JwtService.SECOND_TO_NEED_UPDATE
    );
  }

  isMustUpdate(): boolean {
    //if null -> return false
    //null will be if res <= 0,
    //so 1 <= 0 = false
    return (this.expireDifferenceBetweenNow() ?? 1) <= 0;
  }

  expireDifferenceBetweenNow(): number | null {
    return this.data?.exp?.diff(DateTime.now(), 'seconds')?.seconds ?? null;
  }

  update(): Observable<HttpResponse<void>> {
    this._updating$.next(true);
    return this.http
      .put<void>(JwtService.UPDATE_URL, `"${this.refresh}"`, { observe: 'response' })
      .pipe(finalize(() => this._updating$.next(false)));
  }

  private decode(): Data | null {
    try {
      const data = jwtDecode<Data>(this.access);
      data.exp = DateTime.fromSeconds(data.exp as unknown as number);
      return data;
    } catch (error) {
      return null;
    }
  }
}
