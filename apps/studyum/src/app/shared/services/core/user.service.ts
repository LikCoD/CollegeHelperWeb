import {Injectable} from "@angular/core"
import {HttpService} from "../http/http.service"
import {map, Observable, ReplaySubject, tap} from "rxjs"
import {Router} from "@angular/router"
import {AcceptUser, User} from "../../models/user"

@Injectable({providedIn: "root"})
export class UserService {
  user$: ReplaySubject<User | undefined> = new ReplaySubject<User | undefined>(
    1
  )

  constructor(private httpService: HttpService, private router: Router) {
    httpService.getUser().subscribe({
      next: (value) => {
        this.user$.next(value)
      },
      error: (_) => {
        this.user$.next(undefined)
      }
    })
  }

  getUser(): Observable<User | undefined> {
    return this.user$
  }

  signUp(data: any) {
    return this.httpService.signUp(data).pipe(tap((u) => this.user$.next(u)))
  }

  signUpStage1(data: any) {
    return this.httpService
      .signUpStage1(data)
      .pipe(tap((u) => this.user$.next(u)))
  }

  signUpWithCode(data: any) {
    return this.httpService
      .signUpWithCode(data)
      .pipe(tap((u) => this.user$.next(u)))
  }

  login(credentials: any) {
    return this.httpService
      .login(credentials)
      .pipe(tap((value) => this.user$.next(value)))
  }

  update(data: any) {
    this.httpService.updateUser(data).subscribe({
      next: (value) => {
        this.user$.next(value)
      }
    })
  }

  signOut() {
    return this.httpService
      .signOut()
      .pipe(tap((_) => this.user$.next(undefined)))
  }

  terminateAllSessions() {
    return this.httpService
      .terminateAllSessions()
      .pipe(tap((_) => this.user$.next(undefined)))
  }

  putToken(token: string) {
    return this.httpService.putToken(token).pipe(tap((u) => this.user$.next(u)))
  }

  createCode(data: any): Observable<any> {
    return this.httpService.createCode(data)
  }

  getAcceptUsers(): Observable<AcceptUser[]> {
    return this.httpService.getAcceptUsers()
  }

  acceptUser(id: string): Observable<string> {
    return this.httpService.acceptUser(id)
  }

  blockUser(id: string): Observable<string> {
    return this.httpService.blockUser(id)
  }

  signOutSilently(): void {
    this.user$.next(undefined)
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData()
    formData.append("file", file, file.name)

    return this.httpService.uploadImage(formData).pipe(map((u) => u.url))
  }

  confirmEmail(value: any): Observable<null> {
    return this.httpService.confirmEmail(value).pipe(
      tap((_) =>
        this.user$.subscribe({
          next: (u) => {
            u!.verifiedEmail = true
            this.user$.next(u)
          }
        })
      )
    )
  }

  resendEmailCode(): Observable<null> {
    return this.httpService.resendEmailCode()
  }

  resetPassword(value: any): Observable<void> {
    return this.httpService.resetPassword(value)
  }

  resendResetPasswordCode(value: any): Observable<void> {
    return this.httpService.resendResetPasswordCode(value)
  }
}
