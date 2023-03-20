import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {AcceptUser, User} from "../../models/user"
import {StudyPlace} from "../../models/general"

@Injectable({
  providedIn: "root",
})
export class HttpService {
  API_PATH = "/api"
  STORAGE_PATH = "/storage"

  constructor(private http: HttpClient) {}

  signUp(data: any): Observable<User> {
    return this.http.post<User>(`${this.API_PATH}/user/signup`, data)
  }

  signUpStage1(data: any): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user/signup/stage1`, data)
  }

  signUpWithCode(data: any): Observable<User> {
    return this.http.post<User>(`${this.API_PATH}/user/signup/code`, data)
  }

  login(credentials: any): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user/login`, credentials)
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_PATH}/user`)
  }

  updateUser(data: any): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user`, data)
  }

  signOut(): Observable<undefined> {
    return this.http.delete<undefined>(`${this.API_PATH}/user/signout`)
  }

  terminateAllSessions(): Observable<null> {
    return this.http.delete<null>(`${this.API_PATH}/user/sessions`)
  }

  putToken(token: string): Observable<User> {
    return this.http.post<User>(`${this.API_PATH}/user/oauth2/token`, {
      token: token,
    })
  }

  getStudyPlaces(restricted = true): Observable<StudyPlace[]> {
    return this.http.get<StudyPlace[]>(
      `${this.API_PATH}/studyPlaces?restricted=${restricted}`
    )
  }

  createCode(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_PATH}/user/code`, data)
  }

  getAcceptUsers(): Observable<AcceptUser[]> {
    return this.http.get<AcceptUser[]>(`${this.API_PATH}/user/accept`)
  }

  acceptUser(id: string) {
    return this.http.post<string>(`${this.API_PATH}/user/accept`, `"${id}"`)
  }

  blockUser(id: string) {
    return this.http.post<string>(`${this.API_PATH}/user/block`, `"${id}"`)
  }

  uploadImage(formData: FormData): Observable<{url: string}> {
    return this.http.post<{url: string}>(`${this.STORAGE_PATH}`, formData)
  }

  confirmEmail(value: any): Observable<null> {
    return this.http.post<null>(`${this.API_PATH}/user/email/confirm`, value)
  }

  resendEmailCode(): Observable<null> {
    return this.http.post<null>(`${this.API_PATH}/user/email/resendCode`, {})
  }

  getCurrentStudyPlace(id: string): Observable<StudyPlace> {
    return this.http.get<StudyPlace>(`${this.API_PATH}/studyPlaces/${id}`)
  }

  resetPassword(value: any): Observable<void> {
    return this.http.put<void>(`${this.API_PATH}/user/password/reset`, value)
  }

  resendResetPasswordCode(value: any): Observable<void> {
    return this.http.post<void>(`${this.API_PATH}/user/password/reset`, value)
  }
}
